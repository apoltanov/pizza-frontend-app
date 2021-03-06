import {
    fetch,
    normalize
} from '../../utils/dataAccess';

export function error(error) {
    return { type: 'PRODUCT_LIST_ERROR', error };
}

export function loading(loading) {
    return { type: 'PRODUCT_LIST_LOADING', loading };
}

export function success(retrieved) {
    return { type: 'PRODUCT_LIST_SUCCESS', retrieved };
}

export function list(page = 'products') {
    return dispatch => {
        dispatch(loading(true));
        dispatch(error(''));

        fetch(page)
            .then(response =>
                response
                    .json()
                    .then(retrieved => ({ retrieved }))
            )
            .then(({ retrieved }) => {
                retrieved = normalize(retrieved);
                dispatch(loading(false));
                dispatch(success(retrieved));
            })
            .catch(e => {
                dispatch(loading(false));
                dispatch(error(e.message));
            });
    };
}