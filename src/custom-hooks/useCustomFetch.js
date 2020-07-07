/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import * as _ from 'lodash'

function useCustomFetch(url, data) {
	const [values, setValues] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);

	async function customFetch(url, data) {
		try {
			let response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			let resData = await response.json();
			setValues(resData);
			setLoading(false);
		} catch (e) {
			setError(e);
			setLoading(false);
		}
	}

	useEffect(() => {
		setLoading(true);
		if (url !== null && !_.isEmpty(data)) {
			customFetch(url, data);
		}
	}, [url,data]);

	return [values, loading, error];
}

export default useCustomFetch;
