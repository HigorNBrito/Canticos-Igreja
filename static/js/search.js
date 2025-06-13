document.addEventListener('DOMContentLoaded', function () {
    fetch('/index.json')
        .then(response => response.json())
        .then(data => {
            const miniSearch = new MiniSearch({
                fields: ['title', 'author', 'lyrics', 'tags'],
                storeFields: ['title', 'author', 'uri']
            });
            miniSearch.addAll(data);

            const searchInput = document.getElementById('searchInput');
            const searchResults = document.getElementById('searchResults');

            searchInput.addEventListener('input', function () {
                const query = searchInput.value;
                if (query.length > 2) {
                    const results = miniSearch.search(query, { prefix: true, fuzzy: 0.2 });
                    searchResults.innerHTML = '';
                    if (results.length > 0) {
                        results.forEach(result => {
                            const li = document.createElement('li');
                            const a = document.createElement('a');
                            a.href = result.uri;
                            a.textContent = result.title + ' - ' + result.author;
                            li.appendChild(a);
                            searchResults.appendChild(li);
                        });
                    } else {
                        searchResults.innerHTML = '<li>Nenhum resultado encontrado.</li>';
                    }
                } else {
                    searchResults.innerHTML = '';
                }
            });
        })
        .catch(error => console.error('Erro ao carregar o índice de pesquisa:', error));
});

