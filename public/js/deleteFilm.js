function deleteFilm(id, authorID) {
     const data = axios.delete(`/api/films/${id}`).then(data => {
        if(data.status == 200){
            location.replace(`/admin/${authorID}`)
        }else if(data.status == 404){
           location.replace('/not-found')
        }
        
     })
}