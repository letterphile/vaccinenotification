var cron = require('node-cron');
var axios = require('axios');
const Notification = require('./mailer');


const notificationObject = new Notification();

const chekAvailabiliy = (centers) =>{
    let available_centers = [];
    if(centers.length<=0){
        return []
    }
    else{
        let i = 0;
        while(i<centers.length){
            let j=0;
            let center = centers[i]
            
            while(j<center.sessions.length){
                // console.log("cneter", center)
                let session = center.sessions[j]
                // console.log(j)
                // console.log("center session",session)
            
            if((parseInt(session.min_age_limit)<=18)&& (parseInt(session.available_capacity)>0)){


            //     console.log()
            //     console.log("center",center.name)
            //     console.log("address",center.address)
            // console.log("Session ", j)
            // console.log("available capacity",session.available_capacity)
            // console.log("date",session.date),
            // console.log("min age limit",session.min_age_limit),
            // console.log("vaccine",session.vaccine)
            available_centers.push({center:center.name,address:center.address,available_capacity:session.available_capacity,date:session.date,min_age_limit:session.min_age_limit,vaccine:session.vaccine})
            }
            j++;
            }
            i++;
        }
        return available_centers
    }
}

const makeApiCall  = async () => {

    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = currentDate.getDate()
    day = parseInt(day)
    day = day.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
    var month = currentDate.getMonth() + 1
    month = parseInt(month)
    month= month.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
    var year = currentDate.getFullYear()
    const fDate = `${day}-${month}-${year}`
    console.log(fDate)
    // const reqOption = {
    //     crossdomain: true,
    //     //   params: {
    //     //       district_id: '304',
    //     //       date:fDate
    //     //   }
    //   }

    var config = {
        method: 'get',
        url: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict',
        headers : {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36', "Upgrade-Insecure-Requests": "1","DNT": "1","Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8","Accept-Language": "en-US,en;q=0.5","Accept-Encoding": "gzip, deflate"},
        params: {
                  district_id: '307',
                   date:fDate
              }
    };
let data;
axios(config)
  .then(response => {
    //   console.log(response.data);
     data =  chekAvailabiliy(response.data.centers)
     if(data.length>0){
        notificationObject.send('aswinactive@gmail.com','aswin4400@gmail.com','Hello from nodemailer',JSON.stringify(data))
     }
  })
  .catch(err=>{
    console.log(err)
  })

}
let result;
cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
  makeApiCall()
  
  
});