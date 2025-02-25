function calculateLeave() {
  const startDate = new Date(document.getElementById('startDate').value);
  const endDate = new Date(document.getElementById('endDate').value);
  if (isNaN(startDate) || isNaN(endDate) || startDate > endDate) {
      alert('請輸入有效的日期範圍');
      return;
  }
  
  const leaveEntitlement = [0, 7, 10, 14, 14, 15, 15, 15, 15, 15, 16];
  const resultTableBody = document.querySelector('#resultTable tbody');
  resultTableBody.innerHTML = '';
  
  let currentYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  let totalUsedLeave = 0;
  let leftLeaveDays = 0;
  let totalEntitled = 0;
  
  while (currentYear <= endYear) {
      let leaveDays = 0;
      let fullYears = currentYear - startDate.getFullYear();
      let entitledLeave = leaveEntitlement[Math.min(fullYears, leaveEntitlement.length - 1)];
      
const yearStart = new Date(currentYear, 0, 1);
      const yearEnd = new Date(currentYear, 11, 31);
      const daysInYear = (yearEnd - yearStart) / (1000 * 60 * 60 * 24) + 1;
      
      let accumulatedLeave = 0;
      
      if (fullYears === 0) {
          let halfYearDate = new Date(startDate);
          halfYearDate.setMonth(startDate.getMonth() + 6);
          if ((endDate - halfYearDate) > 0) {
              totalEntitled = 3;
          }
  
          if (halfYearDate.getFullYear() === currentYear) {
              let daysAfter = (yearEnd - halfYearDate) / (1000 * 60 * 60 * 24) + 1;
              let daysAllocated = daysAfter / (daysInYear / 2);
              
              leaveDays = Math.floor(3 * daysAllocated * 10 + 0.1) / 10;
          }
          leftLeaveDays = 3 - leaveDays;
      } else {
          let nextLeave = entitledLeave;
          let anniversaryDate = new Date(startDate);
          anniversaryDate.setFullYear(startDate.getFullYear() + fullYears);
          
          let daysAfter = (yearEnd - anniversaryDate) / (1000 * 60 * 60 * 24) + 1;
  
          let nextLeaveDays = Math.floor(nextLeave * daysAfter / daysInYear * 10) / 10;
          
          leaveDays = leftLeaveDays + nextLeaveDays;
          leftLeaveDays = nextLeave - nextLeaveDays;
      }
    
      if (currentYear === endYear) {
          let anniversaryDate = new Date(startDate);
          anniversaryDate.setFullYear(startDate.getFullYear() + fullYears);
          
          if ((anniversaryDate - endDate) > 0) {
            fullYears -= 1;
          }
          
          
          for (let i = 1; i <= fullYears; i++) {
              totalEntitled += leaveEntitlement[Math.min(i, leaveEntitlement.length - 1)];
          }
          leaveDays = totalEntitled - totalUsedLeave;
      }
      
      totalUsedLeave += leaveDays;
      
      let row = resultTableBody.insertRow();
      row.insertCell(0).innerText = currentYear;
      row.insertCell(1).innerText = leaveDays.toFixed(1);
      
      currentYear++;
  }
}
