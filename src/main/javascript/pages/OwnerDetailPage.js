/* eslint-disable react/jsx-key */
import h from '@nwtks/vnoc';
import App from '../fragments/App';
import { show } from '../util';

const OwnerDetailPage = (props) => {
  const { messages, owner } = props.state;
  const showPets = owner && owner.pets && owner.pets.length;
  return (
    <App path='#/owners' messages={messages}>
      <section>
        <h2 style={show(owner)}>Owner</h2>
        <div class='card mb-4' style={show(owner)}>
          {owner ? (
            <ul class='list-group list-group-flush'>
              <li class='list-group-item'>
                <div class='row'>
                  <div class='col-sm-2 font-weight-bold'>Name</div>
                  <div class='col'>{owner.name}</div>
                </div>
              </li>
              <li class='list-group-item'>
                <div class='row'>
                  <div class='col-sm-2 font-weight-bold'>Address</div>
                  <div class='col'>{owner.address}</div>
                </div>
              </li>
              <li class='list-group-item'>
                <div class='row'>
                  <div class='col-sm-2 font-weight-bold'>Telephone</div>
                  <div class='col'>{owner.telephone}</div>
                </div>
              </li>
              <li class='list-group-item'>
                <div class='row'>
                  <div class='col'>
                    <a
                      class='btn btn-primary'
                      href={'#/owners/' + owner.id + '/edit'}
                    >
                      Edit Owner
                    </a>
                  </div>
                  <div class='col'>
                    <a
                      class='btn btn-primary'
                      href={'#/owners/' + owner.id + '/pets/new'}
                    >
                      Add New Pet
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          ) : null}
        </div>
      </section>
      <section>
        <h2 style={show(showPets)}>Pets and Visits</h2>
        {showPets
          ? owner.pets.map((p) => <PetItem pet={p} owner={owner} />)
          : null}
      </section>
    </App>
  );
};

const PetItem = (props) => {
  const { pet, owner } = props;
  const showVisits = pet && pet.visits && pet.visits.length;
  return (
    <div domkey={'pet-' + pet.id} class='card mb-2'>
      <ul class='list-group list-group-flush'>
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
        <li class='list-group-item'>
          <div class='row'>
            <div class='col'>
              <a
                class='btn btn-primary'
                href={'#/owners/' + owner.id + '/pets/' + pet.id + '/edit'}
              >
                Edit Pet
              </a>
            </div>
            <div class='col'>
              <a
                class='btn btn-primary'
                href={
                  '#/owners/' + owner.id + '/pets/' + pet.id + '/visits/new'
                }
              >
                Add Visit
              </a>
            </div>
          </div>
        </li>
        {showVisits
          ? pet.visits.map((v) => (
              <VisitItem visit={v} pet={pet} owner={owner} />
            ))
          : null}
      </ul>
    </div>
  );
};

const VisitItem = (props) => {
  const { visit, pet, owner } = props;
  return (
    <li domkey={'visit-' + visit.id} class='list-group-item'>
      <div class='row'>
        <div class='col-sm-2'>{visit.visitDate}</div>
        <div class='col' style='white-space: pre-line'>
          {visit.description}
        </div>
        <div class='col-sm-2'>
          <a
            class='btn btn-primary'
            href={
              '#/owners/' +
              owner.id +
              '/pets/' +
              pet.id +
              '/visits/' +
              visit.id +
              '/edit'
            }
          >
            Edit Visit
          </a>
        </div>
      </div>
    </li>
  );
};

export default OwnerDetailPage;
