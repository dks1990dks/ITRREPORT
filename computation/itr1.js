

let button = document.getElementById(`generateReport`)
button.addEventListener(`click`, () => {
  FetchData()
})

async function FetchData() {
  try {


    const responce = await fetch(`GELPM1877J-Prefill-2025.json`)
    const data = await responce.json()
    // console.log(data.form26as.tdsOnOthThanSals.tdSonOthThanSal[0].taxDeductCreditDtls.taxClaimedOwnHands);


    const AssesseeName = data.personalInfo.assesseeVerName;
    const ayear = document.getElementById(`ayear`).value
    const yearEnddate = new Date(parseInt(ayear), 2, 31).toLocaleDateString(`en-GB`)
    const houseNo = data.personalInfo.address.residenceNo;
    const residentName = data.personalInfo.address.residenceName;
    const roadStreet = data.personalInfo.address.roadOrStreet;
    const area = data.personalInfo.address.localityOrArea
    const picode = data.personalInfo.address.pinCode
    const MobileNo = data.personalInfo.address.mobileNo;
    const email = data.personalInfo.address.emailAddress;
    const panNo = data.personalInfo.assesseVerPan;
    const dob = data.personalInfo.dob;
    const foramtDob = new Date(dob).toLocaleDateString(`en-GB`)
    const fatherName = data.personalInfo.fatherName;
    const adharNo = data.personalInfo.aadhaarCardNo;
    let decodeAdhar = '';
    try {
      decodeAdhar = atob(adharNo);
    } catch (e) {
      decodeAdhar = adharNo || 'Not Available';
    }


    let basicSalary = +document.getElementById(`gross-salary`).value
    let deductionVI6 = +document.getElementById(`deductionVI6`).value || 0;
    let NetSalary = basicSalary - deductionVI6
    let savingaccountInterest = +document.getElementById(`saving-interest`).value || 0;
    let salesinceIncome = +document.getElementById("salesince-income").value || 0;
    let divedendIncome = +document.getElementById("dividend-income").value || 0;
    let Incomefromothersrc = savingaccountInterest + salesinceIncome + divedendIncome;

    let taxPayable = +document.getElementById("tax-payable").value || 0;
    
    let Rebate87A = +document.getElementById("rebate-87a").value || 0;
    let lateFee = +document.getElementById("tax-fee").value || 0;
    let GrossTaxLiability = taxPayable+lateFee-Rebate87A
    let deduction = +document.getElementById("standard-deduction").value || 0;
    let employer = document.getElementById(`employer`).value
    let employerAdress = document.getElementById(`employer-address`).value
    let businessGrossrcvd = +document.getElementById(`Bussiness-Income`).value || 0;
    let bookProfit = 8;
    bookProfit = Math.round((businessGrossrcvd * bookProfit) / 100)
    let declaredProfit = +document.getElementById(`declairedProfit`).value || 0;
    declaredProfit = Math.round((businessGrossrcvd * declaredProfit) / 100);
    let declaredProfitratio = Math.round(+document.getElementById(`declairedProfit`).value || 0);
    let grossTotalIncome = (NetSalary + declaredProfit + Incomefromothersrc) - deduction

    let regime = document.getElementById(`regime`).value
    


    // Assuming bank details are entered in a text input as JSON or comma-separated
    const bankDetails = data.bankAccountDtls[0].addtnlBankDetails;
    let tds = 0;

    try {
      tds = data?.form26as?.tdsOnOthThanSals?.tdSonOthThanSal?.[0]?.taxDeductCreditDtls?.taxClaimedOwnHands || 0;
    } catch (error) {
      console.warn("Error accessing tds value:", error.message);
    }


    document.body.innerHTML = `
<div class="container1">
  <div class="basicdetails">
    <table>
      <tr>
        <td class="label">Assessee Name</td>
        <td id="aName">${AssesseeName}</td>
        <td class="label">A/c.Year Ending</td>
        <td class="data">${yearEnddate}</td>
      </tr>
      <tr>
        <td class="label">Assessment Year</td>
        <td class="data">${ayear} - ${parseInt(ayear) + 1}</td>
      </tr>
      <tr>
        <td class="label">Address</td>
        <td class="data">${houseNo}, ${residentName}, ${roadStreet}, ${area} - ${picode} Gujarat</td>
        <td class="label">Mobile</td>
        <td class="data">+91 ${MobileNo}</td>
      </tr>
      <tr>
        <td class="label">Pan No.</td>
        <td class="data">${panNo}</td>
        <td class="label">Status</td>
        <td class="data">Individual</td>
      </tr>
      <tr>
        <td class="label">Gender</td>
        <td class="data">Male</td>
        <td class="label">Resident Status</td>
        <td class="data">Resident</td>
      </tr>
      <tr>
        <td class="label">Date of Birth</td>
        <td class="data">${foramtDob}</td>
        <td class="label">Email ID</td>
        <td class="data">${email}</td>
      </tr>
      <tr>
        <td class="label">Adhar No.</td>
        <td class="data">${decodeAdhar}</td>
        <td class="label">Father Name</td>
        <td class="data">${fatherName}</td>
      </tr>
    </table>
  </div>

  <h2>COMPUTATION OF TOTAL INCOME<span>(${regime})</span></h2>
  <div class="computation">

    <div class="${basicSalary === 0 ? `hide` : ''}" value="${basicSalary}">
      <table style="width: 100%; table-layout: fixed;">
        <tr>
          <td class="label" colspan="6">Income from Salary (Chapter IV A)</td>
          <td class="data sIncome" style="text-align: right;">${NetSalary}</td>
        </tr>
        <tr><td class="label-1" colspan="7" style="text-decoration: underline;font-weight: 510;">Employer</td></tr>
        <tr><td colspan="7">${employer}</td></tr>
        <tr>
          <td style="font-size:13px" colspan="3">${employerAdress}</td>
        </tr>
        <tr><td class="label-1" colspan="7" style="text-decoration: underline;font-weight: 510;">Salary Details</td></tr>
        <tr><td colspan="3">Basic Salary</td><td style="text-align: right;">${basicSalary}</td></tr>
        <tr><td colspan="3">Salary As Per Sec.17(1)</td><td style="text-align: right;">${basicSalary}</td></tr>
        <tr><td colspan="7" class="label-1" style="text-decoration: underline;font-weight: 510;">Less: Deduction u/s.16:-</td></tr>
        <tr><td colspan="3">Standard Deduction u/s.16(ia)</td><td style="text-align: right;">${deductionVI6}</td></tr>
        <tr>
          <td colspan="3">Taxable Salary</td>
          <td style="text-align: right; border-top: 2px solid black; border-bottom: 2px solid black;">${NetSalary}</td>
        </tr>
      </table>
    </div>

    <div class="${declaredProfit === 0 ? `hide` : ''}" value="${declaredProfit}">
      <table style="width: 100%; table-layout: fixed;">
        <tr>
          <td class="label" colspan="6">Income from Business or Profession (Chapter IV D)</td>
          <td class="data bincome" style="text-align: right;">${declaredProfit}</td>
        </tr>
        <tr><td colspan="3">Income u/s 44AD</td><td style="text-align: right;">${declaredProfit}</td></tr>
      </table>
    </div>

    <div class="${Incomefromothersrc === 0 ? `hide` : ''}" value="${Incomefromothersrc}">
      <table style="width: 100%; table-layout: fixed;">
        <tr>
          <td class="label" colspan="6">Income from Other Sources (Chapter IV F)</td>
          <td colspan="1" class="data" style="text-align: right;">${Incomefromothersrc}</td>
        </tr>
        <tr><td colspan="7" class="label-1" style="text-decoration: underline;font-weight: 510;">Interest Income</td></tr>
        <tr><td colspan="3">Interest on Saving Account</td><td style="text-align: right;">${savingaccountInterest}</td></tr>
        <tr class="hide"><td colspan="3">Interest on Income Tax Refund</td><td style="text-align: right;">560.00</td></tr>
        <tr class="${divedendIncome ===0 ? `hide` : ''}" value="${divedendIncome}"><td colspan="3">Dividend Income Equity Share</td><td style="text-align: right;">${divedendIncome}</td></tr>
        <tr class="${salesinceIncome === 0 ? `hide` : ''}" value="${salesinceIncome}"><td  colspan="3">Sales Incentive</td><td style="text-align: right;">${salesinceIncome}</td></tr>
        <tr>
          <td colspan="3">Total Other Income</td>
          <td style="text-align: right; border-top: 2px solid black; border-bottom: 2px solid black;">${Incomefromothersrc}</td>
        </tr>
      </table>
    </div>

    <div class="hide">
      <table style="width: 100%; table-layout: fixed;">
        <tr>
          <td class="label" colspan="6">Deduction Under Chapter VI-A</td>
          <td class="data" style="text-align: right;">${savingaccountInterest}</td>
        </tr>
        <tr><td colspan="7" class="label-1" style="text-decoration: underline;font-weight: 510;">Deduction u/s.80TTA</td></tr>
        <tr><td colspan="3">Interest on Deposits in Saving Account</td><td style="text-align: right;">${savingaccountInterest}</td></tr>
        <tr><td colspan="3">Total Deduction</td><td style="text-align: right; border-top: 2px solid black; border-bottom: 2px solid black;">${savingaccountInterest}</td></tr>
      </table>
    </div>

    <div class="totalIncome">
      <table style="width: 100%;">
        <tr>
          <td class="label" colspan="6">Total Income</td>
          <td class="data" style="text-align: right; border-top: 2px solid black;">${grossTotalIncome}</td>
        </tr>
      </table>
    </div>

    <div class="roundIncome">
      <table style="width: 100%;">
        <tr>
          <td colspan="6">Rounded Off u/s.288A</td>
          <td style="text-align: right;">${Math.round(grossTotalIncome / 10) * 10}</td>
        </tr>
      </table>
    </div>

    <div class="taxableIncome">
      <table style="width: 100%;">
        <tr>
          <td class="label" colspan="6">Total Taxable Income</td>
          <td class="data" style="text-align: right; border-bottom: 2px solid black;">${Math.round(grossTotalIncome / 10) * 10}</td>
        </tr>
      </table>
    </div>

    <div class="compuTax">
      <table style="width: 100%; table-layout: fixed;">
        <tr><td class="label" colspan="7" style="text-decoration: underline;font-weight: 510;">Computation of Tax Payable</td></tr>
        <tr><td colspan="7" class="label-1" style="text-decoration: underline;font-weight: 510;">Calculation of Tax Payable</td></tr>
        <tr><td colspan="5">Gross Tax on Rs.${Math.round(grossTotalIncome / 10) * 10} (Normal)</td><td colspan="2" style="text-align: right;">${taxPayable}</td></tr>
        <tr><td colspan="5">Less: Tax Rebate u/s.87(A)</td><td colspan="2" style="text-align: right;">${Rebate87A}</td></tr>
        <tr><td colspan="5">Tax payable after Rebate </td><td colspan="2" style="text-align: right;">${taxPayable-Rebate87A}</td></tr>
        <tr><td colspan="5">Fee u/s 234F </td><td colspan="2" style="text-align: right;">${lateFee}</td></tr>
        <tr><td colspan="5">Tax Payable</td><td colspan="2" style="text-align: right; border-top: 2px solid black;">${GrossTaxLiability}</td></tr>
      </table>
    </div>
    <div class="declared44da">
    <table>
        <thead>
            <tr>
                <th colspan="7" class="label-1" style="text-decoration: underline;font-weight: 510; font-size:15px">Income Declared u/s 44 AD Profit from Profit</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colspan="3">Gross Receipts/Turnover</td>
                <td>${businessGrossrcvd}</td>
            </tr>
            <tr>
                <td colspan="3">Book Profit</td>
                <td>${declaredProfit}</td>
                <td>${declaredProfitratio}%</td>
                
            </tr>
            <tr>
                <td colspan="3">Deemed Profit</td>
                <td>${bookProfit}</td>
                <td>8%</td>
                
            </tr>
            <tr>
                <td colspan="3">Net Profit Declared</td>
                <td>${declaredProfit}</td>
                <td>${declaredProfitratio}% </td>
            </tr>
            
        </tbody>
    </table>
</div>

    
<div class="less hide">
    <table style="width: 100%; table-layout: fixed;">
        <tr>
            <td class="label" colspan="6">Less</td>
        </tr>
        <tr>
            <td colspan="6" class="label-1" style="text-decoration: underline; font-weight: 510;">
                Tax Deducted at Sources:
            </td>
        </tr>
        <tr>
            <td colspan="3">Other than Salary (u/s.194H- Gross Amount 8407)</td>
            <td style="text-align: right;">${tds}</td>
        </tr>
        <tr>
            <td class="label" colspan="5">Total Prepaid Taxes</td>
            <td class="data" style="text-align: right;">${tds}</td>
        </tr>
        <tr>
            <td class="label" colspan="5">Tax Refundable</td>
            <td class="data" style="text-align: right;">-${tds}</td>
        </tr>
        <tr>
            <td class="label" colspan="5">Rounded Off</td>
            <td class="data" style="text-align: right;">-${Math.round(tds / 10) * 10}</td>
        </tr>
    </table>
</div>
    
</div>
        <div class="bank-details">
            <h3>BANK DETAILS</h3>
            <table id ="bankTableBody">
               
                <tr>
                    <th>Sr.No.</th>
                    <th colspan="2">Bank Name</th>
                    <th colspan="2">Account No.</th>
                    <th>IFSC</th>
                    <th>Account Type</th>
                    <th>Primary </th>
                </tr>
                
            </table>
        </div>
        <div class="tds-details bank-details hide">
            <h3>Schedule-TDS2 (Details of TDS on Income as per Form No.16A issued by Deductor(s))</h3>
            <table id = "tdsTablebody">
               
                <tr>
                    <th>Sr.No.</th>
                    <th colspan="2">TAN</th>
                    <th colspan="2">Name of the deductor</th>
                    <th>Head of Income</th>
                    <th>Gross Amount</th>
                    <th>F.Y</th>
                    <th>Amount B/F</th>
                    <th>Total Tax Deducted</th>
                    <th>Amount claimed for this year</th>
                    <th>Amount C/F for Next year</th>
                </tr>
                <tr>
                    
                </tr>
                
            </table>
        </div>
        <div class="regime bank-details" >
            <h3>OLD REGIME VS NEW REGIME (Comparison)</h3>
            <table>
                <tr>
                    <th>Income / Exemption / Deduction</th>
                    <th>+ / - </th>
                    <th>Old Regime</th>
                    <th>New Regime</th>
                </tr>
                <tr class="${basicSalary === 0 ? `hide` : ''}" value="${basicSalary}">
                    <td style="text-align: left;" >Salary Income</td>
                    <td>+</td>
                    <td style="text-align: right;">${basicSalary}</td>
                    <td style="text-align: right;">${basicSalary}</td>
                </tr>
                <tr class="${deductionVI6 === 0 ? 'hide' : ''}" value="${deductionVI6}">
                <td style="text-align: left;">Standard Deduction</td>
                <td>-</td>
                <td style="text-align: right;">${deductionVI6}</td>
                <td style="text-align: right;">${deductionVI6}</td>
                </tr>
                <tr class="${declaredProfit === 0 ? `hide` : ''}" value="${declaredProfit}">
                    <td style="text-align: left;">Business Income</td>
                    <td>+</td>
                    <td style="text-align: right;">${declaredProfit}</td>
                    <td style="text-align: right;">${declaredProfit}</td>
                </tr>
                <tr class="${Incomefromothersrc === 0 ? `hide` : ''}" value="${Incomefromothersrc}">
                    <td style="text-align: left;">Other Source Income</td>
                    <td>+</td>
                    <td style="text-align: right;">${Incomefromothersrc}</td>
                    <td style="text-align: right;">${Incomefromothersrc}</td>

                </tr>
                <tr class="${deduction === 0 ? `hide` : ''}" value="${deduction}">
                    <td style="text-align: left;">Deduction VIA (Except 80CCD(2) & 80JJAA)</td>
                    <td>-</td>
                    <td style="text-align: right;">${deduction}</td>
                    <td style="text-align: right;">0</td>
                </tr>
                <tr>
                    <td colspan="" class="tds-total">Total</td>
                    <td colspan="" class="tds-total"> </td>
                    <td class="tds-total" style="text-align: right;">${grossTotalIncome}</td>
                    <td colspan="" class="tds-total" style="text-align: right;" >${grossTotalIncome + deduction}</td>
                    
                </tr>
            </table>
        </div>
  <div class="taxcalc bank-details">
  <h3>Tax Calculation</h3>
  <table id="taxTable" border="1">
    <thead>
      <tr>
        <th colspan="3">Old Regime</th>
        <th colspan="3">New Regime</th>
      </tr>
      <tr>
        <th>Tax Slab</th>
        <th>Rate</th>
        <th>Tax</th>
        <th>Tax Slab</th>
        <th>Rate</th>
        <th>Tax</th>
      </tr>
    </thead>
    <tbody id="taxTableBody"></tbody>
    <tfoot>
      <tr>
        <th></th>
        <th>Total Tax</th>
        <th id="oldTotalTax"></th>
        <th></th>
        <th></th>
        <th id="newTotalTax"></th>
      </tr>
    </tfoot>
  </table>
</div>
               
                
 </div>`



    const hideElement = document.querySelectorAll(`.hide`)
    hideElement.forEach(e => {
      e.remove()
    })
    console.log(bankDetails[0]);

    // show the bank details from json file 
    const bankTableBody = document.getElementById(`bankTableBody`)
    bankDetails.forEach((bank, index) => {
      const isPrimary = bank.useForRefund === "true" ? `Yes` : `No`
      const rw = document.createElement(`tr`)
      rw.innerHTML = `
        <td>${index + 1}</td>
        <td colspan="2">${bank.bankName}</td>
        <td colspan="2">${bank.bankAccountNo}</td>
        <td>${bank.ifsccode}</td>
        <td>${bank.AccountType === "SB" ? `Saving` : bank.AccountType}</td>
        <td>${isPrimary}</td>`

      bankTableBody.appendChild(rw)
    })

    // Tax calculation for both Regime

    const income = grossTotalIncome;
    console.log(income);

    const oldRegimeSlabs = [
      { min: 0, max: 250000, rate: 0 },
      { min: 250000, max: 500000, rate: 5 },
      { min: 500000, max: 1000000, rate: 20 },
      { min: 1000000, max: Infinity, rate: 30 }
    ];

    const newRegimeSlabs = [
      { min: 0, max: 300000, rate: 0 },
      { min: 300000, max: 700000, rate: 5 },
      { min: 700000, max: 1000000, rate: 10 },
      { min: 1000000, max: 1200000, rate: 15 },
      { min: 1200000, max: 1500000, rate: 20 },
      { min: 1500000, max: Infinity, rate: 30 }
    ];
    function calculateTax(income, slabs) {
      let taxBreakdown = []
      let totalTax = 0
      for (const slab of slabs) {
        if (income > slab.min) {
          let taxableIncome = Math.min(income, slab.max) - slab.min
          let tax = taxableIncome * (slab.rate / 100)
          taxBreakdown.push({
            slab: `${slab.min} - ${slab.max === Infinity ? 'and above' : slab.max}`,
            rate: `${slab.rate}%`,
            tax: Math.round(tax)

          })
          totalTax += Math.round(tax);

        } else {
          taxBreakdown.push({
            slab: `${slab.min} - ${slab.max === Infinity ? 'and above' : slab.max}`,
            rate: `${slab.rate}%`,
            tax: `0.00`

          })
        }
      }
      return { taxBreakdown, totalTax: totalTax }
    }
    const oldTax = calculateTax(income, oldRegimeSlabs)
    const newTax = calculateTax(income, newRegimeSlabs)
    console.log(oldTax, newTax);

    const tableBody = document.getElementById(`taxTableBody`)
    const maxRow = Math.max(oldTax.taxBreakdown.length, newTax.taxBreakdown.length)
    for (let i = 0; i < maxRow; i++) {
      const oldRow = oldTax.taxBreakdown[i] || { slab: "", rate: "", tax: "" };
      const newRow = newTax.taxBreakdown[i] || { slab: "", rate: "", tax: "" };

      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td style="text-align: left;">${oldRow.slab}</td>
      <td style="text-align: right;">${oldRow.rate}</td>
      <td style="text-align: right;">${oldRow.tax}</td>
      <td style="text-align: left;">${newRow.slab}</td>
      <td style="text-align: right;">${newRow.rate}</td>
      <td style="text-align: right;">${newRow.tax}</td>
    `;
      tableBody.appendChild(tr);
    }

    document.getElementById("oldTotalTax").textContent = oldTax.totalTax;
    document.getElementById("newTotalTax").textContent = newTax.totalTax;

    



    // Deducted tds Details Showing 
    console.log(data.form26as.tdsOnOthThanSals.tdSonOthThanSal[0].employerOrDeductorOrCollectDetl.tan);
    const tdsBody = document.getElementById(`tdsTablebody`)
    const tdsdetails = data.form26as.tdsOnOthThanSals.tdSonOthThanSal;
    tdsdetails.forEach((tds, index) => {
      const rw = document.createElement(`tr`)
      rw.innerHTML = `
            <td>${index + 1}</td>
            <td colspan="2">${tds.employerOrDeductorOrCollectDetl.tan}</td>
            <td colspan="2">${tds.employerOrDeductorOrCollectDetl.employerOrDeductorOrCollecterName}</td>
            <td>${tds.headOfIncome}</td>
            <td>${tds.grossAmount}</td>
            <td>${ayear - 1}-${ayear}</td>
            <td>0</td>
            <td>${tds.taxDeductCreditDtls.taxDeductedOwnHands}</td>
            <td>${tds.taxDeductCreditDtls.taxClaimedOwnHands}</td>
            <td>0</td>
            `
      tdsBody.appendChild(rw)
    })


  } catch (error) {
    console.log(error);

  }

}






