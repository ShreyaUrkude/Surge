"use client";
import React, { useRef, useState } from 'react';
import styles from './Account.module.css';
import Image from "next/image";
import getImg from './photo.png';
import address from './address.png'
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
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.58824 16.4118H2.92394L13.7626 5.57312L12.4269 4.23741L1.58824 15.0761V16.4118ZM0 18V14.4164L13.9664 0.456088C14.1265 0.310676 14.3032 0.198353 14.4966 0.119118C14.6902 0.0397059 14.8931 0 15.1054 0C15.3177 0 15.5233 0.037677 15.7222 0.11303C15.9213 0.188383 16.0975 0.308205 16.2508 0.472499L17.5439 1.78174C17.7082 1.93509 17.8253 2.11156 17.8952 2.31115C17.9651 2.51074 18 2.71032 18 2.90991C18 3.12291 17.9636 3.32612 17.8909 3.51953C17.8182 3.71312 17.7026 3.88994 17.5439 4.05L3.58359 18H0ZM13.0831 4.91691L12.4269 4.23741L13.7626 5.57312L13.0831 4.91691Z" fill="#6E736A"/>
</svg>

  );
  const DeleteSvg = (
  <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.99325 18C2.46164 18 2.00749 17.8118 1.63082 17.4353C1.25432 17.0586 1.06607 16.6044 1.06607 16.0728V2.54204H0V0.942936H4.7973V0H11.1937V0.942936H15.991V2.54204H14.9249V16.0728C14.9249 16.6114 14.7384 17.0672 14.3652 17.4403C13.9921 17.8134 13.5363 18 12.9977 18H2.99325ZM13.3258 2.54204H2.66517V16.0728C2.66517 16.1686 2.6959 16.2472 2.75738 16.3087C2.81886 16.3702 2.89748 16.4009 2.99325 16.4009H12.9977C13.0798 16.4009 13.155 16.3667 13.2232 16.2983C13.2916 16.2301 13.3258 16.1549 13.3258 16.0728V2.54204ZM5.22799 14.2688H6.82682V4.67417H5.22799V14.2688ZM9.16417 14.2688H10.763V4.67417H9.16417V14.2688Z" fill="currentColor"/>
  </svg>
);

  return (
    <div className={styles.shell}> 
     
      <div className={styles.mainContent}>
        
      
        <div className={styles.leftCol}>
          <section className={styles.profileBox}>
            <div className={styles.imageWrapper}>
              <Image src={getImg} alt="Profile" width={195} height={195} className={styles.profileImage} priority />
            </div>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" />
            <button className={styles.uploadBtn} onClick={() => fileInputRef.current?.click()}>Upload photo</button>
          </section>

          <section className={styles.formSection}>
            <div className={styles.personalInfoHeader}>
              <h3 className={styles.sectionTitles}>Personal Information</h3>


                {/* upadted */}
              <button onClick={handleStartEdit} className={styles.editBtn}>Edit</button>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.underlineInputGroup} style={{ display: 'flex', alignItems: 'center' }}>
                <input ref={nameInputRef} className={styles.underlineInput} defaultValue="Ahmed Al-Mansouri" disabled={!isEditing} style={{ flex: 1 }} />
              </div>

              <div className={styles.underlineInputGroup} style={{ display: 'flex', alignItems: 'center' }}>
                <input className={styles.underlineInput} value="ahmed.almansouri@email.com"  style={{ flex: 1 }} />
              </div>

              <div className={styles.row}>
                <div className={styles.underlineInputGroup} style={{ flex: 1.5, display: 'flex', alignItems: 'center' }}>
                  <input className={styles.underlineInput} defaultValue="+971 50 123 4567" disabled={!isEditing} style={{ flex: 1 }} />
                </div>

                 <div className={styles.underlineInputGroup} style={{ flex: 1, position: 'relative' }}>

              <div className={styles.underlineSelect} onClick={() => isEditing && setIsGenderOpen(!isGenderOpen)} style={{ cursor: isEditing ? 'pointer' : 'default', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                {gender}

                <svg width="17" height="9" viewBox="0 0 17 9" fill="none"><path d="M8.27175 9L-0.000935071 7.02781e-07L16.5444 -1.71995e-06L8.27175 9Z" fill="#414343"/></svg>

              </div>

              {isGenderOpen && isEditing && (

                
                <div className={styles.genderDropdown} style={{ position: 'absolute', top: '80%', left: 0, width: '100%', background: '#F5F5F5', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
             <div onClick={() => {setGender('Gender'); setIsGenderOpen(false)}} style={{padding: '10px', cursor: 'pointer'}}>Gender</div>
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

       
          
        </div>

       <div className={styles.rightCol}>
  <section className={styles.addressSection}>
    <div className={styles.addressHeader}>
      <h3 className={styles.sectionTitles}>Saved Address</h3>
      <button className={styles.addAddressBtn}>+ Add Address</button>
    </div>
    
  
    {[1 , 2,3 ,4].length > 0 ? (
      [1, 2, 3, 4].map((item, index) => (
        <div className={styles.addressCard} key={index}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>{index === 0 ? "Default Address" : "Other Address"}</span>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.nameRow}>
              <span className={styles.userNameCard}>Ahmed Al-Mansouri</span>
              <span className={styles.badge}>{index === 0 ? "Home" : "Office"}</span>
            </div>
            <p className={styles.addressText}>
              Office 1502, <br/>
              Jumeirah Business Centre 1 <br/>
              Jumeirah Lakes Towers (JLT), Cluster G <br/>
              Dubai, UAE 450123
            </p>
            <p className={styles.phoneText}>Phone number: +971 50 123 4567</p>
  {/* upadted*/}
            <div className={styles.cardBtn}>
              <button className={styles.penIcon}>{PenSvg}</button>
              <button className={styles.penIcon}>{DeleteSvg}</button>
            </div>
          </div>
        </div>
      ))
    ) : (


      /* ---  0 State ke liye */
      <div className={styles.noAddressContainer}>
        <div className={styles.noAddressIcon}>
          <Image 
            src={address}
            alt="No Address" 
            width={240} 
            height={160} 
          />
        </div>
        <h4 className={styles.noAddressTitle}>No saved addresses yet</h4>
        <p className={styles.noAddressSubtext}>Add a delivery address to make checkout faster.</p>
      </div>
    )}
  </section>

  <section className={styles.deleteAccountSection}>
    <h3 className={styles.sectionTitles}>Delete Account</h3>
    <button className={styles.deleteBtn}>Delete My Account</button>
  </section>
</div>

      </div>
    </div>
  );
}