"use strict"
/* eslint-disable indent */

//  Définition de la classe "Media"
// eslint-disable-next-line no-unused-vars
class Media {
    constructor(id, photographerId, image, video, tags, likes, date, price) {
        this.id = id
        this.photographerId = photographerId
        this.image = image
        this.tags = tags
        this.likes = likes
        this.date = date
        this.price = price
    }

    gallery() {
        let reg1 = /\b.jpg/g
        let reg2 = /[_$]/g
        let regApply1st
        let regApply2
        let tagline
        if (this.image != null) {
            regApply1st = this.image.replace(reg1, "")
            regApply2 = regApply1st.replace(/([a-z])([A-Z])/g, "$1 $2")
            tagline = regApply2.replace(reg2, " ")
        }

        return `
        <li class="cards__gallery "> 
            <div class='card__gallery'>
            <img src="photos/${this.image}" class="image-gallery">
                <div class="p_row">
                <p id="max_text">${tagline}</p>
                <p>${this.price}€&nbsp;&nbsp;${this.likes}&#10084;</p>   
                </div>
            </div>
        </li>
        `
    }

    displayLikes() {
        let likes = null

        return `
        <li class="cards__item "> 
            <div class='card'>
            <p class='card__text card__price'>
            199 &#10084;
            </p>
            </div>
        </li>
        `
    }
}

// ID: ${this.id}, Tagline: ${tagline},  Tags: ${this.tags}, Likes: ${this.likes}, Date: ${this.date}, Price: ${this.price}€
