const CONTENT_TYPE_JSON = { 'Content-Type': 'application/json; charset=utf-8' };

const createApi = () => {
  const api = {
    getOwners: (filter, callback) =>
      rest(
        fetch(
          'api/owners?' + (filter ? 'filter=' + encodeURIComponent(filter) : '')
        ),
        callback
      ),
    getOwner: (ownerId, callback) =>
      rest(fetch('api/owners/' + ownerId), callback),
    postOwner: (form, callback) =>
      rest(
        fetch('api/owners', {
          method: 'POST',
          headers: CONTENT_TYPE_JSON,
          body: JSON.stringify(form),
        }),
        callback
      ),
    putOwner: (ownerId, form, callback) =>
      rest(
        fetch('api/owners/' + ownerId, {
          method: 'PUT',
          headers: CONTENT_TYPE_JSON,
          body: JSON.stringify(form),
        }),
        callback
      ),
    postPet: (ownerId, form, callback) =>
      rest(
        fetch('api/owners/' + ownerId + '/pets', {
          method: 'POST',
          headers: CONTENT_TYPE_JSON,
          body: JSON.stringify(form),
        }),
        callback
      ),
    putPet: (ownerId, petId, form, callback) =>
      rest(
        fetch('api/owners/' + ownerId + '/pets/' + petId, {
          method: 'PUT',
          headers: CONTENT_TYPE_JSON,
          body: JSON.stringify(form),
        }),
        callback
      ),
    postVisit: (ownerId, petId, form, callback) =>
      rest(
        fetch('api/owners/' + ownerId + '/pets/' + petId + '/visits', {
          method: 'POST',
          headers: CONTENT_TYPE_JSON,
          body: JSON.stringify(form),
        }),
        callback
      ),
    putVisit: (ownerId, petId, visitId, form, callback) =>
      rest(
        fetch(
          'api/owners/' + ownerId + '/pets/' + petId + '/visits/' + visitId,
          {
            method: 'PUT',
            headers: CONTENT_TYPE_JSON,
            body: JSON.stringify(form),
          }
        ),
        callback
      ),
    getPetTypes: (callback) => rest(fetch('api/pettypes'), callback),
    getVets: (callback) => rest(fetch('api/vets'), callback),
  };
  return api;
};

const rest = (fetch, callback) =>
  fetch
    .then((res) => res.json())
    .then(callback)
    .catch((err) => console.error(err));

export default createApi;
