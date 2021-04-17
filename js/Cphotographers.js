"use strict"
/* eslint-disable indent */

//  Définition de la classe "Photographer"
// eslint-disable-next-line no-unused-vars
class Photographer {
    constructor(name, id, city, country, tags, tagline, price, portrait) {
        this.name = name
        this.id = id
        this.city = city
        this.country = country
        this.tags = tags
        this.portrait = portrait
        this.tagline = tagline
        this.price = price
    }
    // Méthode sur index.html
    display() {
        return `
        <li class="cards__item "> 
            <div class='card'>
            <a href="photographer.html?id=${this.id}" 
                title="${this.name}"  class="card__a"> 
                <div class='card__image'>
                <img src="photos/${
                    this.portrait
                }" class="img__card pointeur" id="${this.id}" name="${
            this.name
        }" alt="${this.name}" > 
                </div>
                <div class='card__content'>
                    <div class='card__title'>
                    ${this.name} 
                    </div></a>
                    <p class='card__text card__place'
                    id="test">
                    ${this.city}, ${this.country} 
                    </p>
                    <p class='card__text card__tagline'>
                    ${this.tagline}
                    </p>
                    <p class='card__text card__price'>
                    ${this.price}€/jour
                    </p>
                    <ul class="tag">
                    ${this.tags
                        .map(
                            (tag) => `<li class='photographer-tag'>#${tag}</li>`
                        )
                        .join("")}                                 
                    </ul>
                </div> 
            </div>
        </li>
        `
    }

    // Méthode sur photographer.html
    displayPhotographer() {
        return `
        <li class="cards__item "> 
            <div class='card'>
              
                <div class='card__image'>
                <img src="photos/${
                    this.portrait
                }" class="img__card pointeur" id="mainpix" > 
                </div>

                <button class="contactMe">Contactez-moi</button>
                    
                <div class='card__content'>
                    <h1 class='card__title'>
                    ${this.name} 
                    </h1>
                    <p class='card__text card__place'
                    id="test">
                    ${this.country}, ${this.city} 
                    </p>
                    <p class='card__text card__tagline'>
                    ${this.tagline}
                    </p>

                    <button id="contactMe">Contactez-moi</button>

                    <ul class="tag" >
                    ${this.tags
                        .map(
                            (tag) =>
                                `<li class='photographer-tag allTags' id="${tag}" >#${tag}</li>`
                        )
                        .join("")}                                 
                    </ul>
                </div> 
            </div>
        </li>
        `
    }
    // Méthode sur photographer.html
    displayPrice() {
        return `
        <li class="cards__price "> 
            <div class=''>
            <p class='card__text card__price'>
            ${this.price}€ / jour
            </p>
            </div>
        </li>
        `
    }
}
