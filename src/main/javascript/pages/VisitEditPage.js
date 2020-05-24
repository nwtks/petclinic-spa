/* eslint-disable react/jsx-key */
import h from '@nwtks/vnoc';
import App from '../fragments/App';
import { show } from '../util';

const VisitEditPage = (props) => {
  const emit = props.emit;
  const { messages, form, errors, owner, pet } = props.state;
  const showVisits = form.isNew && pet && pet.visits && pet.visits.length;
  return (
    <App path='#/owners' messages={messages}>
      <section>
        <h2>{form.isNew ? 'Add Visit' : 'Update Visit'}</h2>
        <div class='card mb-3' style={show(pet)}>
          <div class='card-header'>Pet</div>
          <ul class='list-group list-group-flush'>
            {pet ? (
              <li class='list-group-item'>
                <div class='row'>
                  <div class='col-sm-auto font-weight-bold'>Name</div>
                  <div class='col'>{pet.name}</div>
                  <div class='col-sm-auto font-weight-bold'>Birth Date</div>
                  <div class='col'>{pet.birthDate}</div>
                  <div class='col-sm-auto font-weight-bold'>Type</div>
                  <div class='col'>{pet.type.name}</div>
                </div>
              </li>
            ) : null}
            {owner ? (
              <li class='list-group-item'>
                <div class='row'>
                  <div class='col-sm-auto font-weight-bold'>Owner</div>
                  <div class='col'>{owner.name}</div>
                </div>
              </li>
            ) : null}
          </ul>
        </div>
        <form
          domkey='form-visit'
          class='form-horizontal'
          onsubmit={() => emit('postVisitForm', {}) && false}
        >
          <div class='form-group row'>
            <label class='col-sm-2 col-form-label'>Visit Date</label>
            <div class='col'>
              <input
                class={'form-control' + (errors.visitDate ? ' is-invalid' : '')}
                type='text'
                value={form.visitDate}
                onchange={(ev) =>
                  emit('setVisitForm', {
                    name: 'visitDate',
                    value: ev.target.value,
                  })
                }
                oninput={(ev) =>
                  emit('inputVisitForm', {
                    name: 'visitDate',
                    value: ev.target.value,
                  })
                }
              />
              <div class='invalid-feedback d-block' style='height:1em;'>
                {errors.visitDate}
              </div>
            </div>
          </div>
          <div class='form-group row'>
            <label class='col-sm-2 col-form-label'>Description</label>
            <div class='col'>
              <textarea
                class={
                  'form-control' + (errors.description ? ' is-invalid' : '')
                }
                value={form.description}
                rows='5'
                onchange={(ev) =>
                  emit('setVisitForm', {
                    name: 'description',
                    value: ev.target.value,
                  })
                }
                oninput={(ev) =>
                  emit('inputVisitForm', {
                    name: 'description',
                    value: ev.target.value,
                  })
                }
              />
              <div class='invalid-feedback d-block' style='height:1em;'>
                {errors.description}
              </div>
            </div>
          </div>
          <div class='form-group row'>
            <div class='offset-sm-2 col'>
              <button class='btn btn-primary' type='submit'>
                {form.isNew ? 'Add Visit' : 'Update Visit'}
              </button>
            </div>
          </div>
        </form>
      </section>
      <section>
        <h2 style={show(showVisits)}>Previous Visits</h2>
        <ul class='list-group' style={show(showVisits)}>
          {showVisits ? pet.visits.map((v) => <VisitItem visit={v} />) : null}
        </ul>
      </section>
    </App>
  );
};

const VisitItem = (props) => {
  const { visit } = props;
  return (
    <li domkey={'visit-' + visit.id} class='list-group-item'>
      <div class='row'>
        <div class='col-sm-2'>{visit.visitDate}</div>
        <div class='col' style='white-space: pre-line'>
          {visit.description}
        </div>
      </div>
    </li>
  );
};

export default VisitEditPage;
