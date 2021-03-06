const request=require('request')
const weather=(lattitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/6f5fa1d24d06c1a591400cf7bdc60a12/'+lattitude+','+longitude
    request({url,json:true},(error,response)=>{
       if (error) {
        callback('Unable to connect to weather service!', undefined)
    } else if (response.body.error) {
        callback('Unable to find location', undefined)
    } else {
        callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
    }
    })
}
module.exports=weather