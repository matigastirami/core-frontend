import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

const PermissionsulComponent = (props) => {

    useEffect(() => {
        /*UIkit.accordion("#appAccordion", {});
        UIkit.accordion(".appSubAccordion", {});*/
    }, [  ])

    return (
        <div>
            <h1>{props.title}</h1>
            <ul id="appAccordion" data-uk-accordion >
            {   
                props.items.map((item, i) => {
                    return (
                        <li key={i}>
                            <a className="uk-accordion-title" href="#">
                                App: {item?.app?.code ?? 'No code' + " - " + item?.app?.description ?? 'No description'}
                            </a>
                            <div className="uk-accordion-content">
                                {
                                    item.roles.map((role, roleIndex) => {
                                        return (
                                            <div key={roleIndex}>
                                                <div className="uk-card uk-card-default uk-card-small uk-card-body">
                                                    <h3 className="uk-card-title">Código rol: { role?.role?.code }</h3>
                                                    <p>{ role?.role?.description }</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </li>
                    )
                })
            }
            </ul>
        </div>
    );
}

PermissionsulComponent.propTypes = {
    items: PropTypes.array.isRequired,
};

export default PermissionsulComponent