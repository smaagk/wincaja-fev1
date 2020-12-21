/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import * as _ from 'lodash'
import { useSelector } from 'react-redux';

function useCustomFetch(url, data) {
	const [values, setValues] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);
	const token = useSelector((state) => state.auth.token);

	async function customFetch(url, data) {
		try {
			let response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			});

			let resData = await response.json();
			console.log(resData)
			setValues(resData);
			setLoading(false);
		} catch (e) {
			setError(e);
			setLoading(false);
		}
	}

	useEffect(() => {
		setLoading(true);
		console.log(url);
		console.log(data)
		if (url !== null && !_.isEmpty(data)) {
			customFetch(url, data);
		}
	}, [url,data]);

	return [values, loading, error];
}

export default useCustomFetch;
