"use strict"
/* eslint-disable indent */

//  Définition de la classe "Media"
// eslint-disable-next-line no-unused-vars
class Media {
    constructor(id, photographerId, image, tags, likes, date, price) {
        this.id = id
        this.photographerId = photographerId
        this.image = image
        this.tags = tags
        this.likes = likes
        this.date = date
        this.price = price
        // let reg1 = /\b.jpg/g
        // let reg2 = /[_$]/g
        // let regApply1st = this.image.replace(reg1, "")
        // this.tagline = regApply1st.replace(reg2, " ")
    }

    gallery() {
        let reg1 = /\b.jpg/g
        let reg2 = /[_$]/g
        let regApply1st = this.image.replace(reg1, "")
        let tagline = regApply1st.replace(reg2, " ")
        return `
        <li class="cards__item "> 
            <div class='card'>
            <img src="photos/${this.image}" class="image-gallery">
               ID: ${this.id}, Tagline: ${tagline} Tags: ${this.tags}, Likes: ${this.likes}, Date: ${this.date}, Price: ${this.price}€
            </div>
        </li>
        `
    }
}
