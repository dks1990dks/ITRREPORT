document.getElementById("GenerateBalanceSheet").addEventListener("click", () => {

  async function FetchData(params) {
    try {
      const response = await fetch("computation/GELPM1877J-Prefill-2025.json");
      const data = await response.json();
      console.log(data.personalInfo);

      const businessName = data.personalInfo.assesseeVerName;
      const houseNo = data.personalInfo.address.residenceNo;
      const residentName = data.personalInfo.address.residenceName;
      const roadStreet = data.personalInfo.address.roadOrStreet;
      const area = data.personalInfo.address.localityOrArea;
      const pinCode = data.personalInfo.address.pinCode;
      const panNumber = data.personalInfo.assesseVerPan;
      const ayear = document.getElementById("assessment-year").value;
      const statementTitle = document.getElementById("statement-title").value;
      const yearEnding = new Date(parseInt(ayear), 2, 31).toLocaleDateString("en-GB");

      // Calculate cash Balance
      const totalLiabilitiesBalance =
        (+document.getElementById("capital").value || 0) +
        (+document.getElementById("loans").value || 0) +
        (+document.getElementById("creditors").value || 0) +
        (+document.getElementById("bike-loan").value || 0) +
        (+document.getElementById("personal-loan").value || 0) +
        (+document.getElementById("credit-card").value || 0) +
        (+document.getElementById("consumer-loan").value || 0);

      const totalAssetsBalance =
        (+document.getElementById("stock").value || 0) +
        (+document.getElementById("debtors").value || 0) +
        (+document.getElementById("bank").value || 0) +
        (+document.getElementById("mobile").value || 0) +
        (+document.getElementById("bike").value || 0) +
        (+document.getElementById("other-assets").value || 0) +
        (+document.getElementById("cash").value || 0) +
        (+document.getElementById("lic").value || 0) +
        (+document.getElementById("sip").value || 0) +
        (+document.getElementById("cash").value || 0) +
        (+document.getElementById("loan-advance").value || 0);

      const otherAssets = totalLiabilitiesBalance - (totalAssetsBalance - (+document.getElementById("cash").value || 0));
      document.getElementById("other-assets").value = otherAssets.toFixed(2);




      const inputs = {
        "Liabilities": {
          "Capital A/c": +document.getElementById("capital").value || 0,
          "Secured Loans": +document.getElementById("loans").value || 0,
          "Sundry Creditors": +document.getElementById("creditors").value || 0,
          "Bike Loan": +document.getElementById("bike-loan").value || 0,
          "Personal Loan": +document.getElementById("personal-loan").value || 0,
          "Credit Card Outstanding": +document.getElementById("credit-card").value || 0,
          "Consumer Loan": +document.getElementById("consumer-loan").value || 0
        },
        "Assets": {
          "Sundry Debtors": +document.getElementById("debtors").value || 0,
          "Stock": +document.getElementById("stock").value || 0,
          "Mobile Appliance": +document.getElementById("mobile").value || 0,
          "Bike - Personal Use": +document.getElementById("bike").value || 0,
          "Lic - Jeevan Anand": +document.getElementById("lic").value || 0,
          "Sip - Mutual Fund": +document.getElementById("sip").value || 0,
          "Loan Advance": +document.getElementById("loan-advance").value || 0,
          "Other Assets": +document.getElementById("other-assets").value || 0,
          "Bank Balance": +document.getElementById("bank").value || 0,
          "Cash in Hand": +document.getElementById("cash").value || 0

        }
      };

      const liabilities = [];
      const assets = [];
      let totalLiabilities = 0, totalAssets = 0;

      for (const [label, amount] of Object.entries(inputs["Liabilities"])) {
        if (amount !== 0) {
          liabilities.push({ label, amount });
          totalLiabilities += amount;
        }
      }

      for (const [label, amount] of Object.entries(inputs["Assets"])) {
        if (amount !== 0) {
          assets.push({ label, amount });
          totalAssets += amount;
        }
      }

      let rows = '';
      const maxRows = Math.max(liabilities.length, assets.length);
      for (let i = 0; i < maxRows; i++) {
        const liab = liabilities[i];
        const asset = assets[i];
        rows += `
      <tr>
        <td colspan="2">${liab ? liab.label : ''}</td>
        <td>${liab ? liab.amount.toFixed(2) : ''}</td>
        <td colspan="2">${asset ? asset.label : ''}</td>
        <td>${asset ? asset.amount.toFixed(2) : ''}</td>
      </tr>`;
      }

      // Replace content with balance sheet
      document.body.innerHTML = `
<style>
  body {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  .container h1, .container h2, .container h3 {
    text-align: center;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    font-size: 16px;
  }
  th, td {
    border: 1px solid #333;
    padding: 8px 12px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
    font-weight: bold;
    text-align: center;
  }
  tfoot td {
    font-weight: bold;
    background-color: #e6e6e6;
  }
  tbody tr:nth-child(even) {
    background-color: #fafafa;
  }
</style>

<div class="container">
  <h1>${businessName}</h1>
  <h3>${houseNo}, ${residentName}, ${roadStreet}, ${area}, ${pinCode}</h3>
  <h3>PAN No: ${panNumber}, Assessment Year: ${ayear} - ${parseInt(ayear) + 1}</h3>
  <h2>${statementTitle}</h2>
  <h3>For the year ending ${yearEnding}</h3>
  <div class="capital">
    <table>
      <thead>
        <tr>
          <th colspan="2">Liabilities</th><th>Amount</th>
          <th colspan="2">Assets</th><th>Amount</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
      <tfoot>
        ${[...Array(2)].map(() => `
          <tr>
            <td colspan="2">&nbsp;</td>
            <td></td>
            <td colspan="2">&nbsp;</td>
            <td></td>
          </tr>`).join('')}
        <tr>
          <td colspan="2"><strong>Total</strong></td><td><strong>${totalLiabilities.toFixed(2)}</strong></td>
          <td colspan="2"><strong>Total</strong></td><td><strong>${totalAssets.toFixed(2)}</strong></td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>`;

    } catch (error) {
      console.log(`Error :${error}`);

    }

  }
  FetchData()
});
