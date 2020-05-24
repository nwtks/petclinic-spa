import h from '@nwtks/vnoc';
import App from '../fragments/App';

const OwnerEditPage = (props) => {
  const emit = props.emit;
  const { messages, form, errors } = props.state;
  return (
    <App path='#/owners' messages={messages}>
      <section>
        <h2>{form.isNew ? 'Add Owner' : 'Update Owner'}</h2>
        <form
          domkey='form-owner'
          class='form-horizontal'
          onsubmit={() => emit('postOwnerForm', {}) && false}
        >
          <div class='form-group row'>
            <label class='col-sm-2 col-form-label'>Name</label>
            <div class='col'>
              <input
                class={'form-control' + (errors.name ? ' is-invalid' : '')}
                type='text'
                value={form.name}
                onchange={(ev) =>
                  emit('setOwnerForm', {
                    name: 'name',
                    value: ev.target.value,
                  })
                }
                oninput={(ev) =>
                  emit('inputOwnerForm', {
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
            <label class='col-sm-2 col-form-label'>Address</label>
            <div class='col'>
              <input
                class={'form-control' + (errors.address ? ' is-invalid' : '')}
                type='text'
                value={form.address}
                onchange={(ev) =>
                  emit('setOwnerForm', {
                    name: 'address',
                    value: ev.target.value,
                  })
                }
                oninput={(ev) =>
                  emit('inputOwnerForm', {
                    name: 'address',
                    value: ev.target.value,
                  })
                }
              />
              <div class='invalid-feedback d-block' style='height:1em;'>
                {errors.address}
              </div>
            </div>
          </div>
          <div class='form-group row'>
            <label class='col-sm-2 col-form-label'>Telephone</label>
            <div class='col'>
              <input
                class={'form-control' + (errors.telephone ? ' is-invalid' : '')}
                type='text'
                value={form.telephone}
                onchange={(ev) =>
                  emit('setOwnerForm', {
                    name: 'telephone',
                    value: ev.target.value,
                  })
                }
                oninput={(ev) =>
                  emit('inputOwnerForm', {
                    name: 'telephone',
                    value: ev.target.value,
                  })
                }
              />
              <div class='invalid-feedback d-block' style='height:1em;'>
                {errors.telephone}
              </div>
            </div>
          </div>
          <div class='form-group row'>
            <div class='offset-sm-2 col'>
              <button class='btn btn-primary' type='submit'>
                {form.isNew ? 'Add Owner' : 'Update Owner'}
              </button>
            </div>
          </div>
        </form>
      </section>
    </App>
  );
};

export default OwnerEditPage;
