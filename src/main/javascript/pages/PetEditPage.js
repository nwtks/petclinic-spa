/* eslint-disable react/jsx-key */
import h from '@nwtks/vnoc';
import App from '../fragments/App';
import { show } from '../util';

const PetEditPage = (props) => {
  const emit = props.emit;
  const { messages, form, errors, owner, petTypes } = props.state;
  return (
    <App path='#/owners' messages={messages}>
      <section>
        <h2>{form.isNew ? 'Add Pet' : 'Update Pet'}</h2>
        <div class='card mb-3' style={show(owner)}>
          <div class='card-header'>Owner</div>
          <ul class='list-group list-group-flush'>
            {owner ? (
              <li class='list-group-item'>
                <div class='row'>
                  <div class='col-sm-auto font-weight-bold'>Name</div>
                  <div class='col'>{owner.name}</div>
                </div>
              </li>
            ) : null}
          </ul>
        </div>
        <form
          domkey='form-pet'
          class='form-horizontal'
          onsubmit={() => emit('postPetForm', {}) && false}
        >
          <div class='form-group row'>
            <label class='col-sm-2 col-form-label'>Name</label>
            <div class=' col'>
              <input
                class={'form-control' + (errors.name ? ' is-invalid' : '')}
                type='text'
                value={form.name}
                onchange={(ev) =>
                  emit('setPetForm', {
                    name: 'name',
                    value: ev.target.value,
                  })
                }
                oninput={(ev) =>
                  emit('inputPetForm', {
                    name: 'name',
                    value: ev.target.value,
                  })
                }
              />
              <div class='invalid-feedback d-block' style='height:1em;'>
                {errors.name}
              </div>
            </div>
          </div>
          <div class='form-group row'>
            <label class='col-sm-2 col-form-label'>Birth Date</label>
            <div class=' col'>
              <input
                class={'form-control' + (errors.birthDate ? ' is-invalid' : '')}
                type='text'
                value={form.birthDate}
                onchange={(ev) =>
                  emit('setPetForm', {
                    name: 'birthDate',
                    value: ev.target.value,
                  })
                }
                oninput={(ev) =>
                  emit('inputPetForm', {
                    name: 'birthDate',
                    value: ev.target.value,
                  })
                }
              />
              <div class='invalid-feedback d-block' style='height:1em;'>
                {errors.birthDate}
              </div>
            </div>
          </div>
          <div class='form-group row'>
            <label class='col-sm-2 col-form-label'>Type</label>
            <div class='col'>
              <select
                class={'form-control' + (errors.typeId ? ' is-invalid' : '')}
                value={form.typeId}
                onchange={(ev) =>
                  emit('setPetForm', {
                    name: 'typeId',
                    value: ev.target.value,
                  })
                }
              >
                <option />
                {petTypes.map((t) => (
                  <option
                    value={t.id}
                    selected={'' + form.typeId === '' + t.id}
                  >
                    {t.name}
                  </option>
                ))}
              </select>
              <div class='invalid-feedback d-block' style='height:1em;'>
                {errors.typeId}
              </div>
            </div>
          </div>
          <div class='form-group row'>
            <div class='offset-sm-2 col'>
              <button class='btn btn-primary' type='submit'>
                {form.isNew ? 'Add Pet' : 'Update Pet'}
              </button>
            </div>
          </div>
        </form>
      </section>
    </App>
  );
};

export default PetEditPage;
