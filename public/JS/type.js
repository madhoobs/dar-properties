function company() {
  let isCompany = document.getElementById('Company').selected
  if (isCompany) {
    document.getElementById('firstName').style.display = 'none'
    document.getElementById('lastName').style.display = 'none'
    document.getElementById('companyName').style.display = 'block'
    document.getElementById('companyCR').style.display = 'block'
    document.getElementById('address').style.display = 'block'
  } else {
    document.getElementById('companyName').style.display = 'none'
    document.getElementById('companyCR').style.display = 'none'
    document.getElementById('address').style.display = 'none'
    document.getElementById('firstName').style.display = 'block'
    document.getElementById('lastName').style.display = 'block'
  }
}

function AgentCustomer() {
  let type = document.getElementById('type').value
}
