function company() {
    let type=document.getElementById('type').value
    switch(type){
        case 'Company':
        document.getElementById('firstName').style.display='none'
        document.getElementById('lastName').style.display='none'
        document.getElementById('companyName').style.display='block'
        document.getElementById('companyCR').style.display='block'
        document.getElementById('Address').style.display='block'


        break
        case 'Agent':
        case 'Customer':
        document.getElementById('companyName').style.display='none'
        document.getElementById('companyCR').style.display='none'
        document.getElementById('Address').style.display='none'
        document.getElementById('firstName').style.display='block'
        document.getElementById('lastName').style.display='block'
            break
        default:
            

    }
}


function AgentCustomer() {
    let type=document.getElementById('type').value
    
}