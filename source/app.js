const express=require('express')
const app=express()
const path=require('path')
const hbs=require('hbs')
const port=process.env.PORT || 3000
const forecast=require('./utils/weathercode')
const geocode=require('./utils/geocode')

hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../templates/views'))
app.use(express.static(path.join(__dirname,'../public')))

app.get('/',(req,res)=>{
  res.render('index')
 
})
app.get('/about',(req,res)=>{
    res.render('about')
})

app.get('/document',(req,res)=>{
    res.render('document')
})
app.get('/search',(req,res)=>{
   if(!req.query.country){
       return res.send('enter country ahole')
   }
   geocode(req.query.country, (error, { latitude, longitude, location } = {}) => {
    if (error) {
        return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
    })
})
})

app.listen(port,()=>{
    console.log('port running :'+port)
})