const plugin = {
    name: 'giphy',
    setup: {
        create: launchGiphyApp
    }
};

async function launchGiphyApp() {

    try {
        const pluginElement = document.getElementById('ef2go-plugin-'+plugin.name);

        const response = await fetch(window.plugins.giphy.apicaller ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
            },
            body: JSON.stringify({
                handle: 'giphy.search'
            })
        });

        const giphies = await response.json();

        giphies.data.forEach(function(gif){

            let img = document.createElement('img');
            img.src = gif.images.downsized.url;

            pluginElement.appendChild(img);

        });

    } catch(exception) {
        console.log('An error occured', exception);
    }

}

function getCookie(sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

window.registerPlugin({ plugin });
