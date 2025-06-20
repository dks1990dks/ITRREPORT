document.getElementById("GenrateReport").addEventListener("click", () => {
  async function FetchData() {
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

      // Calculate Balance C/f
      const creditTotal =
        (+document.getElementById("opening-balance").value || 0) +
        (+document.getElementById("salary-income").value || 0) +
        (+document.getElementById("business-income").value || 0) +
        (+document.getElementById("rent-income").value || 0) +
        (+document.getElementById("commission-income").value || 0) +
        (+document.getElementById("saving-interest").value || 0) +
        (+document.getElementById("dividend-income").value || 0) +
        (+document.getElementById("other-income").value || 0);

      const debitTotalBeforeBalance =
        (+document.getElementById("lic-premium").value || 0) +
        (+document.getElementById("pexpences").value || 0) +
        (+document.getElementById("drawing").value || 0);

      const balanceCF = creditTotal - debitTotalBeforeBalance;

      // Update the Balance C/f input
      document.getElementById("balance-cf").value = balanceCF.toFixed(2);

      // Fetch all inputs
      const inputs = {
        "By Opening Balance": +document.getElementById("opening-balance").value || 0,
        "By Salary Income": +document.getElementById("salary-income").value || 0,
        "By Income from Retail Business": +document.getElementById("business-income").value || 0,
        "By Rent Income": +document.getElementById("rent-income").value || 0,
        "By Income from Commission": +document.getElementById("commission-income").value || 0,
        "By Interest on Saving Bank A/c": +document.getElementById("saving-interest").value || 0,
        "By Dividend Income": +document.getElementById("dividend-income").value || 0,
        "By Other Income": +document.getElementById("other-income").value || 0,

        "To Lic Insurance Premium": -(+document.getElementById("lic-premium").value || 0),
        "To Personal Expenses": -(+document.getElementById("pexpences").value || 0),
        "To Drawing": -(+document.getElementById("drawing").value || 0),
        "To Balance C/f": -(+document.getElementById("balance-cf").value || 0),
      };

      // Separate Dr and Cr
      const drEntries = [];
      const crEntries = [];
      let totalDr = 0, totalCr = 0;

      for (const [label, amount] of Object.entries(inputs)) {
        if (amount !== 0) {
          if (amount > 0) {
            crEntries.push({ label, amount });
            totalCr += amount;
          } else {
            drEntries.push({ label, amount: -amount });
            totalDr += -amount;
          }
        }
      }

      // Build table rows
      let rows = '';
      const maxRows = Math.max(drEntries.length, crEntries.length);
      for (let i = 0; i < maxRows; i++) {
        const dr = drEntries[i];
        const cr = crEntries[i];
        rows += `
          <tr>
            <td colspan="2">${dr ? dr.label : ''}</td>
            <td>${dr ? dr.amount.toFixed(2) : ''}</td>
            <td colspan="2">${cr ? cr.label : ''}</td>
            <td>${cr ? cr.amount.toFixed(2) : ''}</td>
          </tr>`;
      }

      // Replace body content
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
            <table border="1" cellspacing="0" cellpadding="5">
              <thead>
                <tr>
                  <th colspan="2">Particular</th><th>Amount (Dr)</th>
                  <th colspan="2">Particular</th><th>Amount (Cr)</th>
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
                  <td colspan="2"><strong>Total</strong></td><td><strong>${totalDr.toFixed(2)}</strong></td>
                  <td colspan="2"><strong>Total</strong></td><td><strong>${totalCr.toFixed(2)}</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>`;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  FetchData();
});
