"use client";
import React, { forwardRef } from "react";
import styles from "./receipt.module.css"; // Ensure this file exists and is styled accordingly
import CurrencyFormatter from "../currency/Currency";
import logo from "../../../public/logo2.jpg";
import Image from "next/image";

const Receipt = forwardRef(
  (
    {
      customer,
      returnItems,
      exchangeItems,
      returnTotal,
      exchangeTotal,
      balanceMessage,
      exchangeId,
      returnId,
    },
    ref
  ) => {
    const shortexchangeId = exchangeId ? exchangeId.substring(0, 8) : null;
    const shortreturnId = returnId ? returnId.substring(0, 8) : null;

    return (
      <div ref={ref} className={styles.receipt} id="receipt">
        <div className={styles.brandarea}>
          <h2 className={styles.receiptTitle}>Receipt</h2>
          <div className={styles.logo}>
            <Image src={logo} />
          </div>
          <div className={styles.address}>
            <p>
              along sepele road, country home junction, (inside noma family
              filling staction)benin edo state.
            </p>
          </div>
          <div className={styles.number}>
            <p>07059144319</p>
            <p>07032495118</p>
          </div>
        </div>

        {customer && (
          <div className={styles.constumer_info}>
            <h3>Receipt Info</h3>

            {returnItems.length > 0 ? (
              <div className={styles.item}>
                <p>Return ID:</p>
                <p>{shortreturnId}</p>
              </div>
            ) : null}

            {exchangeItems.length > 0 ? (
              <div className={styles.item}>
                <p>Exchange ID:</p>
                <p>{shortexchangeId}</p>
              </div>
            ) : null}

            <div className={styles.item}>
              <p>Customer Name:</p>
              <p>{customer.customer_name}</p>
            </div>

            <div className={styles.item}>
              <p>Contact:</p>
              <p>{customer.number}</p>
            </div>

            <div className={styles.item}>
              <p>date:</p>
              <p>{customer.date}</p>
            </div>
          </div>
        )}

        {returnItems.length > 0 && (
          <div className={styles.return_section}>
            <h3>Returned Items</h3>
            {/* {returnItems.map((item, index) => (
              <div className={styles.box} key={index}>
                <div className={styles.item}>
                  <p>Item:</p>
                  <p>{item.item}</p>
                </div>
                <div className={styles.item}>
                  <p>Quantity:</p>
                  <p>{item.qty}</p>
                </div>
                <div className={styles.item}>
                  <p>Amount per Item:</p>
                  <div className={styles.figure}>
                    <p>
                      <CurrencyFormatter amount={item.amount_per_item} />
                    </p>
                  </div>
                </div>
                <div className={styles.item}>
                  <p>Total:</p>
                  <div className={styles.figure}>
                    <p>
                      <CurrencyFormatter
                        amount={item.qty * item.amount_per_item}
                      />
                    </p>
                  </div>
                </div>
              </div>
            ))} */}

            <table className={styles.table}>
              <thead>
                <tr className={styles.tr}>
                  <th className={styles.th}>Item</th>
                  <th className={styles.th}>Amount per Item</th>
                  <th className={styles.th}>Quantity</th>
                  <th className={styles.th}>total</th>
                </tr>
              </thead>
              <tbody>
                {returnItems.length > 0 ? (
                  returnItems.map((item, index) => (
                    <tr key={index} className={styles.tr}>
                      <td className={styles.td}>{item.item}</td>
                      <td className={styles.td}>
                        <div className={styles.price}>
                          <div className={styles.amount}>
                            <span>
                              <CurrencyFormatter
                                amount={item.amount_per_item}
                              />
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className={styles.td}>{item.qty}</td>
                      <td className={styles.td}>
                        <p className={styles.brand}>
                          {item.qty * item.amount_per_item}
                        </p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>No items to display</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className={styles.item}>
              <p>Total Return Value:</p>
              <div className={styles.figure}>
                <p>
                  <CurrencyFormatter amount={returnTotal} />
                </p>
              </div>
            </div>
          </div>
        )}

        {exchangeItems.length > 0 && (
          <div className={styles.exchange}>
            <h3>Exchanged Items</h3>
            {/* {exchangeItems.map((item, index) => (
              <div className={styles.box} key={index}>
                <div className={styles.item}>
                  <p>Item:</p>
                  <p>{item.item}</p>
                </div>
                <div className={styles.item}>
                  <p>Quantity:</p>
                  <p>{item.qty}</p>
                </div>
                <div className={styles.item}>
                  <p>Amount per Item:</p>
                  <div className={styles.figure}>
                    <p>
                      <CurrencyFormatter amount={item.amount_per_item} />
                    </p>
                  </div>
                </div>
                <div className={styles.item}>
                  <p>Total:</p>
                  <div className={styles.figure}>
                    <p>
                      <CurrencyFormatter
                        amount={item.qty * item.amount_per_item}
                      />
                    </p>
                  </div>
                </div>
              </div>
            ))} */}

            <table className={styles.table}>
              <thead>
                <tr className={styles.tr}>
                  <th className={styles.th}>Item</th>
                  <th className={styles.th}>Amount per Item</th>
                  <th className={styles.th}>Quantity</th>
                  <th className={styles.th}>total</th>
                </tr>
              </thead>
              <tbody>
                {exchangeItems.length > 0 ? (
                  exchangeItems.map((item, index) => (
                    <tr key={index} className={styles.tr}>
                      <td className={styles.td}>{item.item}</td>
                      <td className={styles.td}>
                        <div className={styles.price}>
                          <div className={styles.amount}>
                            <span>
                              <CurrencyFormatter
                                amount={item.amount_per_item}
                              />
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className={styles.td}>{item.qty}</td>
                      <td className={styles.td}>
                        <p className={styles.brand}>
                          {item.qty * item.amount_per_item}
                        </p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>No items to display</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className={styles.item}>
              <p>Total Exchange Value:</p>
              <div className={styles.figure}>
                <p>
                  <CurrencyFormatter amount={exchangeTotal} />
                </p>
              </div>
            </div>
          </div>
        )}

        {/* https://certs.duolingo.com/y76tncj3upxl9exl */}

        {/* <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Amount per Item</th>
              <th>Quantity</th>
              <th>total</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={index}>
                  <td>{item.item}</td>
                  <td>
                    <div className="price">
                      <div className="amount">
                        <span>
                          <CurrencyFormatter amount={item.amount_per_item} />
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{item.quantity_purchased}</td>
                  <td>
                    <p className="brand">
                      {item.quantity_purchased * item.amount_per_item}
                    </p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No items to display</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="total_value">
          <td colSpan={3} className="totalLabel">
            <p>Total Sale Value</p>
          </td>
          <td>
            <p>
              <CurrencyFormatter amount={totalSaleValue} />
            </p>
          </td>
        </div> */}

        <div className={styles.space}>
          <div className={styles.sign_r}>
            <p className={styles.line}></p>
            <p>customer signature</p>
          </div>

          <div className={styles.sign_l}>
            <div className={styles.line}></div>
            <p>manager signature</p>
          </div>
        </div>

        {balanceMessage && (
          <div className={styles.extra}>
            <h3>Balance Summary:</h3>
            <p>{balanceMessage}</p>
          </div>
        )}
      </div>
    );
  }
);

export default Receipt;
