//profile page//
"use client";
import React, { useRef, useState } from 'react';
import styles from './Account.module.css';
import Image from "next/image";
import getImg from './photo.png';

export default function ProfilePage() {
  const fileInputRef = useRef(null);
  const nameInputRef = useRef(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [gender, setGender] = useState('Male');
  const [isGenderOpen, setIsGenderOpen] = useState(false);

  const handleStartEdit = () => {
    setIsEditing(true);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const PenSvg = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.41176 14.5882H2.59906L12.2334 4.95388L11.0461 3.76659L1.41176 13.4009V14.5882ZM0 16V12.8146L12.4146 0.405411C12.5569 0.276156 12.714 0.176314 12.8859 0.105882C13.058 0.0352941 13.2384 0 13.4271 0C13.6158 0 13.7985 0.0334907 13.9753 0.100471C14.1522 0.167451 14.3089 0.27396 14.4452 0.419999L15.5946 1.58376C15.7406 1.72008 15.8447 1.87694 15.9068 2.05435C15.9689 2.23176 16 2.40918 16 2.58659C16 2.77592 15.9677 2.95655 15.9031 3.12847C15.8384 3.30055 15.7356 3.45773 15.5946 3.6L3.18541 16H0ZM11.6294 4.37059L11.0461 3.76659L12.2334 4.95388L11.6294 4.37059Z" fill="#414343"/>
</svg>

  );

  return (
    <div className={styles.tabContent}>
    
      <section className={styles.profileBox}>
        <div className={styles.imageWrapper}>
          <Image src={getImg} alt="Profile" width={195} height={195} className={styles.profileImage} priority />
        </div>
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" />
        <button className={styles.uploadBtn} onClick={() => fileInputRef.current?.click()}>Upload photo</button>
      </section>

      <section className={styles.formSection}>
        <h3 className={styles.sectionTitles}>Personal Information</h3>

        <div className={styles.formGrid}>
     
          <div className={styles.underlineInputGroup} style={{ display: 'flex', alignItems: 'center' }}>

            <input ref={nameInputRef} className={styles.underlineInput} defaultValue="Ahmed Al-Mansouri" disabled={!isEditing} style={{ flex: 1 }} />

            <button onClick={handleStartEdit} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}>
              
              <span className={styles.svgWrapper}>{PenSvg}</span>
            </button>
          </div>

       
          <div className={styles.underlineInputGroup} style={{ display: 'flex', alignItems: 'center' }}>
            <input className={styles.underlineInput} value="ahmed.almansouri@email.com" readOnly style={{ flex: 1, color: '#999' }} />
            <button style={{ background: 'none', border: 'none', color: '#6b7c6e', cursor: 'pointer' }}>
              <span className={styles.svgWrapper}>{PenSvg}</span>
            </button>
          </div>

          <div className={styles.row}>
          
            <div className={styles.underlineInputGroup} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <input className={styles.underlineInput} defaultValue="+971 50 123 4567" disabled={!isEditing} style={{ flex: 1 }} />
              <button onClick={handleStartEdit} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}>
                <span className={styles.svgWrapper}>{PenSvg}</span>
              </button>
            </div>

          
      <div className={styles.underlineInputGroup} style={{ flex: 1, position: 'relative' }}>
              <div className={styles.underlineSelect} onClick={() => isEditing && setIsGenderOpen(!isGenderOpen)} style={{ cursor: isEditing ? 'pointer' : 'default', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {gender}
                <svg width="17" height="9" viewBox="0 0 17 9" fill="none"><path d="M8.27175 9L-0.000935071 7.02781e-07L16.5444 -1.71995e-06L8.27175 9Z" fill="#414343"/></svg>
              </div>
              {isGenderOpen && isEditing && (
                <div className={styles.genderDropdown} style={{ position: 'absolute', top: '80%', left: 0, width: '100%', background: 'white', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  <div onClick={() => {setGender('Male'); setIsGenderOpen(false)}} style={{padding: '10px', cursor: 'pointer'}}>Male</div>
                  <div onClick={() => {setGender('Female'); setIsGenderOpen(false)}} style={{padding: '10px', cursor: 'pointer'}}>Female</div>
                </div>
              )}
            </div>
          </div>
        </div>

      
      

        {isEditing && (
          <div className={styles.formFooter} style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button className={styles.saveBtn} onClick={() => setIsEditing(false)}>Save Changes</button>
            <button className={styles.cancelBtn} onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        )}
      </section>

      <section className={styles.addressSection}>
                <div className={styles.addressHeader}>
                  <h3 className={styles.sectionTitle}>Saved Address</h3>
                  <button className={styles.addAddressBtn}>+ Add Address</button>
                </div>
        <div className={styles.addressCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Default Address</span>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.nameRow}>
              <span className={styles.userNameCard}>Ahmed Al-Mansouri</span>
              <span className={styles.badge}>Home</span>
            </div>
            <p className={styles.addressText}>
              Office 1502, <br/>
              Jumeirah Business Centre 1 <br/>
              Dubai , UAE 450123
            </p>
            <p className={styles.phoneText}>Phone number: +971 50 123 4567</p>
          </div>
        </div>
         <div className={styles.addressCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Other Address</span>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.nameRow}>
              <span className={styles.userNameCard}>Ahmed Al-Mansouri</span>
              <span className={styles.badge}>Office</span>
            </div>
            <p className={styles.addressText}>
              Office 1502, <br/>
              Jumeirah Business Centre 1 <br/>
              Dubai , UAE 450123
            </p>
            <p className={styles.phoneText}>Phone number: +971 50 123 4567</p>
          </div>
        </div>
         <div className={styles.addressCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Other Address</span>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.nameRow}>
              <span className={styles.userNameCard}>Ahmed Al-Mansouri</span>
              <span className={styles.badge}>Office</span>
            </div>
            <p className={styles.addressText}>
              Office 1502, <br/>
              Jumeirah Business Centre 1 <br/>
              Dubai , UAE 450123
            </p>
            <p className={styles.phoneText}>Phone number: +971 50 123 4567</p>
          </div>
        </div>
         <div className={styles.addressCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Other Address</span>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.nameRow}>
              <span className={styles.userNameCard}>Ahmed Al-Mansouri</span>
              <span className={styles.badge}>Office</span>
            </div>
            <p className={styles.addressText}>
              Office 1502, <br/>
              Jumeirah Business Centre 1 <br/>
              Dubai , UAE 450123
            </p>
            <p className={styles.phoneText}>Phone number: +971 50 123 4567</p>
          </div>
        </div>
      </section>
    </div>
  );
}