/* eslint-disable react/jsx-key */
import h from '@nwtks/vnoc';
import App from '../fragments/App';
import { show } from '../util';

const OwnersPage = (props) => {
  const emit = props.emit;
  const { messages, form, owners } = props.state;
  const showOwners = owners && owners.length;
  return (
    <App path='#/owners' messages={messages}>
      <section>
        <h2>Find Owners</h2>
        <form
          domkey='form-find-owners'
          class='form-horizontal'
          onsubmit={() => emit('searchOwners', {}) && false}
        >
          <div class='form-group row'>
            <label class='col-sm-2 col-form-label'>Name</label>
            <div class='col'>
              <input
                class='form-control'
                type='text'
                value={form.filter}
                oninput={(ev) =>
                  emit('inputOwnersSearchForm', {
                    name: 'filter',
                    value: ev.target.value,
                  })
                }
              />
            </div>
            <div class='col-sm-2'>
              <button class='btn btn-secondary' type='submit'>
                Find Owners
              </button>
            </div>
          </div>
        </form>
      </section>
      <section>
        <h2>
          {showOwners
            ? owners.length === 1
              ? '1 Owner Found'
              : owners.length + ' Owners Found'
            : ''}
        </h2>
        <table class='table table-striped' style={show(showOwners)}>
          <thead>
            <tr>
              <th>Name</th>
              <th class='d-none d-md-table-cell'>Address</th>
              <th>Telephone</th>
              <th class='d-none d-sm-table-cell'>Pets</th>
            </tr>
          </thead>
          <tbody>
            {showOwners ? owners.map((o) => <OwnerItem owner={o} />) : null}
          </tbody>
        </table>
      </section>
      <section>
        <a href='#/owners/new'>
          <button class='btn btn-primary' type='button'>
            Add Owner
          </button>
        </a>
      </section>
    </App>
  );
};

const OwnerItem = (props) => {
  const { owner } = props;
  return (
    <tr domkey={'owner-' + owner.id}>
      <td>
        <a href={'#/owners/' + owner.id}>{owner.name}</a>
      </td>
      <td class='d-none d-md-table-cell'>{owner.address}</td>
      <td>{owner.telephone}</td>
      <td class='d-none d-sm-table-cell'>
        {owner.pets.map((pet) => pet.name).join(', ')}
      </td>
    </tr>
  );
};

export default OwnersPage;
