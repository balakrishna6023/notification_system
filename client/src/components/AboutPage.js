import React from 'react';
import styles from './About.module.css';

const AboutPage = () => {
  return (
    <div className={styles['about-wrapper']}>
      <h2 className={styles['about-header']}>About </h2>
      <p className={styles['about-description']}>
        In many educational institutions, effectively communicating fee-related information is a persistent challenge. 
        Fragmented communication often leaves students unaware of upcoming deadlines, resulting in confusion and potential 
        financial mismanagement.
      </p>
      <section className={styles['about-section']}>
        <p className={styles['about-paragraph']}>
          Missed due dates are common when students don’t receive timely reminders or lose track of their responsibilities, 
          leading to late fees or penalties.
        </p>
        <p className={styles['about-paragraph']}>
          Additionally, limited access to payment history complicates financial tracking, making it difficult for students 
          to monitor pending amounts, verify completed payments, and maintain a clear overview of their financial obligations.
        </p>
        <p className={styles['about-paragraph']}>
          To streamline fee communication and address these pain points, we propose a Fee Management Notification System built 
          with React frameworks. This system automates fee reminders and centralizes access to payment records, reducing missed 
          payments and strengthening financial compliance.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
