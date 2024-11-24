// PaymentsPage.js
import React from 'react';
import './payments.css';

const PaymentsPage = () => {
  // Example default payment data for each row
  const paymentData = [
    {year:"1",
      collegeFees: "5000",
      hostelFees: "3000",
      buildingFund: "1000",
      busFees: "2000",
      totalAmount: "11000",
      amountPaid: "6000",
      pendingAmount: "5000",
    },
    {year:"2",
      collegeFees: "4500",
      hostelFees: "2800",
      buildingFund: "1200",
      busFees: "1800",
      totalAmount: "10300",
      amountPaid: "5000",
      pendingAmount: "5300",
    },
    {year:"3",
      collegeFees: "5200",
      hostelFees: "3200",
      buildingFund: "1100",
      busFees: "2100",
      totalAmount: "11600",
      amountPaid: "7000",
      pendingAmount: "4600",
    },
    {year:"4",
      collegeFees: "4800",
      hostelFees: "2900",
      buildingFund: "1150",
      busFees: "1950",
      totalAmount: "10800",
      amountPaid: "5800",
      pendingAmount: "5000",
    },
  ];

  return (
    <div className="payments-wrapper">
      <h2>Payment Status</h2>
      <table className="payment-table">
        <thead>
          <tr>
            <th>Year</th>
            <th>College Fees</th>
            <th>Hostel Fees</th>
            <th>Building Fund</th>
            <th>Bus Fees</th>
            <th>Total Amount</th>
            <th>Amount Paid</th>
            <th>Pending Amount</th>
          </tr>
        </thead>
        <tbody>
          {/* Render rows with default values */}
          {paymentData.map((payment, index) => (
            <tr key={index}>
                <td>{payment.year}</td>
              <td>{payment.collegeFees}</td>
              <td>{payment.hostelFees}</td>
              <td>{payment.buildingFund}</td>
              <td>{payment.busFees}</td>
              <td>{payment.totalAmount}</td>
              <td>{payment.amountPaid}</td>
              <td>{payment.pendingAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsPage;
