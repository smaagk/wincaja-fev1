/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import * as _ from 'lodash'
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function useDeleteFetch(url: string, data: any) {
	const [values, setValues] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const token = useSelector((state: RootState) => state.auth.token);

	async function customFetch(url: string, data: any) {
		try {
			let response = await fetch(url, {
				method: 'DELETE',
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
		if (url !== null && !_.isEmpty(data)) {
			console.log(data)
			customFetch(url, data);
		}
	}, [url,data]);

	return [values, loading, error];
}

export default useDeleteFetch;
