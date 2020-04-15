const request=require('request')
const geocode=(location,callback)=>{
const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token=pk.eyJ1IjoiYW1vZ2gwMDciLCJhIjoiY2s4ZW9oM3k3MDJ0ejNndHB0N3JycGQ2eCJ9.CFC-RgHmH50TM8ifL7k1tw'
request({url,json:true},(error,Response)=>{
if(error){
    callback('there is some error in connecting to the server please check your internet',undefined)
}else if(Response.body.features.length===0){
    callback('your location might be incorrecty',undefined)
}else{
    callback(undefined,{
        latitude: Response.body.features[0].center[1],
                longitude: Response.body.features[0].center[0],
                location: Response.body.features[0].place_name
    })
}

})
}

module.exports=geocode
