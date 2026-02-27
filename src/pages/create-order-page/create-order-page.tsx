import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';

import React, { useContext, useState, useMemo, useEffect } from 'react';
import { useOrderContext } from '../../context/order-context';
import { UserContext } from "../../context/user-context";
import { ICONS, IRegUser } from "../../shared";
import styles from "./create-order-page.module.css";
import { useNewPost } from '../../hooks/useNewPost';
import { useCitySearch, City } from '../../hooks/useCitySearch';



export interface Warehouse {
    Ref: string;
    Description: string;
    TypeOfWarehouse: string;
    TotalMaxWeightAllowed: string;
    WarehouseStatus: string;
    POSTerminal: string;
    PostalCodeUA: string;
    Schedule: {
        Monday: string;
        Tuesday: string;
        Wednesday: string;
        Thursday: string;
        Friday: string;
        Saturday: string;
        Sunday: string;
    };
}

const NP_TYPE_BRANCH = '841339c7-591a-42e2-8233-7a9344855799';
const NP_TYPE_POSTOMAT = 'f6545701-d602-11e4-acc6-005056801329';

const POPULAR_CITIES = [
    { Description: 'Київ', Ref: '8d5a980d-391c-11dd-90d9-001a92567626' },
    { Description: 'Харків', Ref: 'db55d143-391c-11dd-90d9-001a92567626' },
    { Description: 'Одеса', Ref: 'db5c88f0-391c-11dd-90d9-001a92567626' },
    { Description: 'Дніпро', Ref: 'db5c88cf-391c-11dd-90d9-001a92567626' },
    { Description: 'Львів', Ref: 'db5c88e5-391c-11dd-90d9-001a92567626' },
    { Description: 'Запоріжжя', Ref: 'db5c88d7-391c-11dd-90d9-001a92567626' },
];

export interface IFormValues {
    firstName: string;
    lastName: string;
    middleName?: string;
    phone: string;
    email: string;
    city?: string;
    warehouse?: string;
    street?: string;
    house?: string;
    deliveryType: 'warehouse' | 'postomat' | 'courier' | 'express';
    paymentMethod: string;
    comment?: string;
}

export function CheckoutPage() {
    const { productInOrder } = useOrderContext();
    const userContext = useContext(UserContext);
    
    const [cityQuery, setCityQuery] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<City | null>(null);

    const { register, handleSubmit, setValue, watch, control } = useForm<IFormValues>({
        defaultValues: { 
            deliveryType: 'warehouse',
            paymentMethod: 'online',
            firstName: userContext?.user?.firstName || '',
            lastName: userContext?.user?.lastName || '',
            phone: userContext?.user?.phoneNumber || '',
            email: userContext?.user?.email || '',
            city: '',
            warehouse: '',
            street: '',
        }
    });

    const selectedDelivery = watch("deliveryType");
    const selectedPayment = watch("paymentMethod");

    const { cities, isLoading: isCitiesLoading } = useCitySearch(cityQuery);
    
    type DeliveryFilterType = 'branch' | 'postomat' | 'all';

    const deliveryFilter = useMemo((): DeliveryFilterType => {
        if (selectedDelivery === 'postomat') return 'postomat';
        if (selectedDelivery === 'warehouse') return 'branch';
        return 'all';
    }, [selectedDelivery]);

    const { warehouses, loading: isWarehousesLoading } = useNewPost(
        selectedCity?.Ref || "", 
        deliveryFilter
    );

    const totalPrice = productInOrder?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;

    const handleCitySelection = (city: City) => {
        setSelectedCity(city);
        setCityQuery(city.Description);
        setValue("city", city.Description);
    };

    interface IOrderRequest {
        firstName: string;
        patronymic: string;
        phoneNumber: string;
        email: string;
        comment?: string | null;
        cityName: string;
        paymentMethod: string;
        deliveryType?: string | null;
        warehouseRef?: string | null;
        warehouseDescription?: string | null;
        addressId?: number | null;
        ttnNumber?: string;
        userId: number;
    }
    

    const onSubmit = async (data: IFormValues) => {
        const currentUser = userContext?.user as (IRegUser & { id: number }) | undefined;

        if (!currentUser) {
            alert("Ви не авторизовані!");
            return;
        }

        const orderData = {
            firstName: data.firstName,
            patronymic: data.middleName || "",
            phoneNumber: data.phone,
            email: data.email,
            cityName: data.city || "",
            paymentMethod: data.paymentMethod,
            deliveryType: data.deliveryType,
            warehouseRef: data.warehouse || null,
            addressId: null, 
            comment: data.comment || null,
            userId: currentUser.id,
            ttnNumber: "",
            products: productInOrder.map(item => ({
                productId: item.id 
            }))
        };

        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch('http://localhost:8000/users/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error('Помилка при відправці замовлення');
            }

            const result = await response.json();
            console.log("Замовлення успішно створено:", result);
            alert("Дякуємо за замовлення!");
            
        } catch (error) {
            console.error("Помилка:", error);
            alert("Не вдалося оформити замовлення.");
        }
    };

    useEffect(() => {
        console.log("Товари в замовленні:", productInOrder);
    }, [productInOrder]);

    console.log("Warehouses Type:", typeof warehouses);
    console.log("Warehouses Data:", warehouses)

    return (
        <div className={styles.wrapper}>
            <div className={styles.topNav} onClick={() => window.history.back()}>
                ← ПРОДОВЖИТИ ПОКУПКИ
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className={styles.layout}>
                <div className={styles.formContainer}>
                    <h1 className={styles.mainTitle}>ОФОРМИТИ ЗАМОВЛЕННЯ</h1>
                    
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Ваші контактні дані</h2>
                        <div className={styles.fieldGroup}>
                            <div className={styles.inputWrapper}>
                                <label>Прізвище</label>
                                <input {...register("lastName")} className={styles.baseInput} placeholder="Ваше Прізвище" />
                            </div>
                            <div className={styles.inputWrapper}>
                                <label>Ім’я</label>
                                <input {...register("firstName")} className={styles.baseInput} placeholder="Ваше Ім’я" />
                            </div>
                            <div className={styles.inputWrapper}>
                                <label>По батькові</label>
                                <input {...register("middleName")} className={styles.baseInput} placeholder="По батькові" />
                            </div>
                            <div className={styles.inputWrapper}>
                                <label>Телефон</label>
                                <input {...register("phone")} className={styles.baseInput} placeholder="+ 38 0" />
                            </div>
                            <div className={styles.inputWrapper}>
                                <label>E-mail</label>
                                <input {...register("email")} className={styles.baseInput} placeholder="Ваш E-mail" />
                            </div>
                            <div className={styles.inputWrapper}>
                                <label>Коментар до замовлення</label>
                                <textarea {...register("comment")} className={styles.baseTextarea} placeholder="Що б ви хотіли уточнити" />
                            </div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Доставка</h2>
                        <div className={styles.choiceList}>
                            {[
                                { id: 'postomat', label: 'Нова Пошта до поштомату', icon: <ICONS.newpost /> },
                                { id: 'warehouse', label: 'Нова Пошта до відділення', icon: <ICONS.newpost /> },
                                { id: 'express', label: 'Експрес-доставка по Києву', icon: null },
                                { id: 'courier', label: 'Нова Пошта кур’єром', icon: <ICONS.newpost /> }
                            ].map((opt) => (
                                <div key={opt.id} className={`${styles.choiceOption} ${selectedDelivery === opt.id ? styles.active : ''}`}>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" {...register("deliveryType")} value={opt.id} />
                                        <span className={styles.optionText}>{opt.label}</span>
                                        {opt.icon && <span className={styles.brandIcon}>{opt.icon}</span>}
                                    </label>
                                    
                                    {selectedDelivery === opt.id && (
                                        <div className={styles.subFields}>
                                            {opt.id !== 'express' && (
                                                <div className={styles.inputWrapper}>
                                                    <label>Місто</label>
                                                    <input 
                                                        value={cityQuery}
                                                        onChange={(e) => {
                                                            setCityQuery(e.target.value);
                                                            setSelectedCity(null);
                                                        }}
                                                        className={styles.baseInput} 
                                                        placeholder="Введіть назву міста" 
                                                    />
                                                    
                                                    <div className={styles.popularCities}>
                                                        {POPULAR_CITIES.map(pc => (
                                                            <button key={pc.Ref} type="button" className={styles.cityLink} onClick={() => handleCitySelection(pc)}>
                                                                {pc.Description}
                                                            </button>
                                                        ))}
                                                    </div>

                                                    {isCitiesLoading && <div>Пошук...</div>}
                                                    {cities.length > 0 && !selectedCity && (
                                                        <ul className={styles.suggestionsList}>
                                                            {cities.map((city) => (
                                                                <li key={city.Ref} onClick={() => handleCitySelection(city)} style={{cursor: 'pointer', padding: '5px'}}>
                                                                    {city.Description}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            )}

                                            {(selectedDelivery === 'warehouse' || selectedDelivery === 'postomat') && (
                                                <div className={styles.inputWrapper}>
                                                    <label>
                                                        {selectedDelivery === 'postomat' ? 'Оберіть поштомат' : 'Оберіть відділення'}
                                                    </label>
                                                    
                                                    <Controller
                                                        name="warehouse"
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field: { onChange, value, ref, onBlur, name } }) => {
                                                            const options = Array.isArray(warehouses) ? warehouses.map(w => ({
                                                                value: w.Ref,
                                                                label: `${w.Description} (до ${w.TotalMaxWeightAllowed} кг)`
                                                            })) : [];
                                                            const selectedOption = options.find(o => o.value === value) || null;

                                                            return (
                                                                <Select
                                                                    name={name}
                                                                    ref={ref}
                                                                    onBlur={onBlur}
                                                                    options={options}
                                                                    value={selectedOption}
                                                                    onChange={(val) => onChange(val?.value)}
                                                                    isLoading={isWarehousesLoading}
                                                                    isDisabled={isWarehousesLoading || options.length === 0}
                                                                    placeholder="Почніть вводити назву відділення..."
                                                                    menuPortalTarget={document.body}
                                                                    isClearable
                                                                    isSearchable
                                                                    styles={{
                                                                        menuPortal: base => ({ ...base, zIndex: 9999 }),
                                                                        control: (base) => ({ ...base, borderColor: '#ccc', borderRadius: '8px' })
                                                                    }}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                    
                                                    {!isWarehousesLoading && selectedCity && warehouses.length === 0 && (
                                                        <p className={styles.errorMessage}>На жаль, за вашим запитом відділень не знайдено.</p>
                                                    )}
                                                </div>
                                            )}
                                            {(opt.id === 'courier' || opt.id === 'express') && (
                                                <div className={styles.inputWrapper}>
                                                    <label>Адреса доставки</label>
                                                    <input {...register("street")} className={styles.baseInput} placeholder="Вулиця, будинок, квартира" />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Оплата</h2>
                        <div className={styles.choiceList}>
                            <div className={`${styles.choiceOption} ${selectedPayment === 'cash' ? styles.active : ''}`}>
                                <label className={styles.radioLabel}>
                                    <input type="radio" {...register("paymentMethod")} value="cash" />
                                    <span className={styles.optionText}>Оплата при отриманні</span>
                                </label>
                            </div>

                            <div className={`${styles.choiceOption} ${['online','card','privat','apple','google'].includes(selectedPayment) ? styles.active : ''}`}>
                                <label className={styles.radioLabel}>
                                    <input type="radio" {...register("paymentMethod")} value="online" />
                                    <div className={styles.onlineHeader}>
                                        <span className={styles.optionText}>Оплатити зараз</span>
                                        <div className={styles.payIconsGroup}>
                                            <ICONS.Visa /> <ICONS.MasterCard /> <ICONS.ApplePay /> <ICONS.GooglePay />
                                        </div>
                                    </div>
                                </label>
                                {['online','card','privat','apple','google'].includes(selectedPayment) && (
                                    <div className={styles.paymentSubList}>
                                        {['card', 'privat', 'apple', 'google'].map((method) => (
                                            <label key={method} className={styles.subRadio}>
                                                <input type="radio" {...register("paymentMethod")} value={method} />
                                                <span>
                                                    {method === 'card' && 'Карткою онлайн'}
                                                    {method === 'privat' && 'Privat Pay'}
                                                    {method === 'apple' && 'Apple Pay'}
                                                    {method === 'google' && 'Google Pay'}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                <aside className={styles.summaryCard}>
                    <div className={styles.summaryHeader}>
                        <h3>Замовлення</h3>
                    </div>
                    <div className={styles.orderScroll}>
                        {productInOrder?.map(p => (
                            <div key={p.id} className={styles.orderItem}>
                                <img src={p.image} alt={p.name} />
                                <div className={styles.itemMeta}>
                                    <p>{p.name}</p>
                                    <div className={styles.priceRow}>
                                        <span className={styles.current}>{p.price} ₴</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.totals}>
                        <div className={styles.totalRow}><span>Загальна сума</span><span>{totalPrice} ₴</span></div>
                    </div>
                    <button type="submit" className={styles.btnSubmit}>ПІДТВЕРДИТИ ЗАМОВЛЕННЯ</button>
                </aside>
            </form>
        </div>
    );
}