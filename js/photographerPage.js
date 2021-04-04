// console.log(data)

window.onload = function () {
    // console.log(window.location.search)
    let searchParams = new URLSearchParams(window.location.search)
    let photographerId = searchParams.get("id")
    console.log("Photographer ID : " + photographerId)

    //Instanciation from class PhotographerPage
    let photographerPage = new PhotographerPage()
    photographerPage.display(photographerId)
}
