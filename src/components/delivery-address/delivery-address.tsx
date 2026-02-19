import React, { useState } from 'react';
import { ICONS } from '../../shared/icons';
import { useAddresses } from '../../hooks/use-addresses';
import styles from './delivery-address.module.css';

export const DeliveryAddress: React.FC = () => {
    const { addresses, loading, createAddress, updateAddress } = useAddresses();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        city: '',
        street: '',
        numberOfHouse: '',
        numberOfFlat: '',
        entrance: ''
    });

    const cities = ['Вінниця', 'Одеса', 'Харків', 'Дніпро', 'Київ', 'Львів'];

    const handleEditClick = (addr: any) => {
        setEditingId(addr.id);
        setIsCreating(false);
        setFormData({
            city: addr.city,
            street: addr.street,
            numberOfHouse: String(addr.numberOfHouse),
            numberOfFlat: String(addr.numberOfFlat),
            entrance: String(addr.entrance)
        });
    };

    const onSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            city: formData.city,
            street: formData.street,
            numberOfHouse: Number(formData.numberOfHouse),
            numberOfFlat: Number(formData.numberOfFlat),
            entrance: Number(formData.entrance)
        };

        try {
            if (editingId) {
                await updateAddress(editingId, payload);
            } else {
                await createAddress(payload);
            }
            setEditingId(null);
            setIsCreating(false);
        } catch (err) {
            alert("Помилка при збереженні");
        }
    };

    if (loading && addresses.length === 0) return <div>Завантаження...</div>;

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Адреса доставки</h2>

            <div className={styles.addressList}>
                {addresses.map((addr) => {
                    const isEditing = editingId === addr.id;
                    return (
                        <div key={addr.id} className={`${styles.addressItemWrapper} ${isEditing ? styles.isEditing : ''}`}>
                            <div 
                                className={styles.addressRow}
                                onClick={() => setSelectedAddressId(addr.id)}
                                onMouseEnter={() => setHoveredId(addr.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                <div className={styles.addressInfo}>
                                    <div className={`${styles.radioCustom} ${selectedAddressId === addr.id ? styles.radioChecked : ''}`}>
                                        {selectedAddressId === addr.id && <div className={styles.radioInner} />}
                                    </div>
                                    <span>м. {addr.city}, вул. {addr.street}, {addr.numberOfHouse}</span>
                                </div>
                                <button className={styles.editBtn} onClick={(e) => { e.stopPropagation(); handleEditClick(addr); }}>
                                    {hoveredId === addr.id || isEditing ? <ICONS.lightgreyPencil /> : <ICONS.darkbluePencil />}
                                </button>
                            </div>

                            {isEditing && (
                                <div className={styles.formContainer}>
                                    <form onSubmit={onSave} className={styles.form}>
                                        <div className={styles.inputGroup}>
                                            <label>Місто</label>
                                            <input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                                            <div className={styles.citySuggestions}>
                                                {cities.map(c => (
                                                    <span key={c} onClick={() => setFormData({...formData, city: c})} className={styles.cityLink}>{c}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={styles.inputGroup}><label>Вулиця</label><input value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} /></div>
                                        <div className={styles.rowInputs}>
                                            <div className={styles.inputGroup}><label>Будинок</label><input value={formData.numberOfHouse} onChange={e => setFormData({...formData, numberOfHouse: e.target.value})} /></div>
                                            <div className={styles.inputGroup}><label>Квартира</label><input value={formData.numberOfFlat} onChange={e => setFormData({...formData, numberOfFlat: e.target.value})} /></div>
                                            <div className={styles.inputGroup}><label>Під'їзд</label><input value={formData.entrance} onChange={e => setFormData({...formData, entrance: e.target.value})} /></div>
                                        </div>
                                        <button type="submit" className={styles.saveBtn}>ЗБЕРЕГТИ ЗМІНИ</button>
                                    </form>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {!isCreating ? (
                <button className={styles.addAddressBtn} onClick={() => { setIsCreating(true); setEditingId(null); setFormData({city:'', street:'', numberOfHouse:'', numberOfFlat:'', entrance:''}); }}>
                    <span>+</span> ДОДАТИ АДРЕСУ
                </button>
            ) : (
                <div className={styles.addressItemWrapper} style={{marginTop: '16px'}}>
                     <div className={styles.formContainer} style={{paddingTop: '20px'}}>
                        <form onSubmit={onSave} className={styles.form}>
                            <div className={styles.inputGroup}><label>Місто</label><input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} /></div>
                            <div className={styles.inputGroup}><label>Вулиця</label><input value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} /></div>
                            <div className={styles.rowInputs}>
                                <div className={styles.inputGroup}><label>Будинок</label><input value={formData.numberOfHouse} onChange={e => setFormData({...formData, numberOfHouse: e.target.value})} /></div>
                                <div className={styles.inputGroup}><label>Квартира</label><input value={formData.numberOfFlat} onChange={e => setFormData({...formData, numberOfFlat: e.target.value})} /></div>
                                <div className={styles.inputGroup}><label>Під'їзд</label><input value={formData.entrance} onChange={e => setFormData({...formData, entrance: e.target.value})} /></div>
                            </div>
                            <button type="submit" className={styles.saveBtn}>ДОДАТИ</button>
                            <button type="button" onClick={() => setIsCreating(false)} style={{border: 'none', background: 'none', marginTop: '10px', cursor: 'pointer'}}>Скасувати</button>
                        </form>
                     </div>
                </div>
            )}
        </div>
    );
};