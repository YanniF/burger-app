import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
	state = {
		orders: [],
		loading: true,
	};

	componentDidMount() {
		axios
			.get('/orders.json')
			.then((res) => {
				const fetchedOrders = [];

				for (let key in res.data) {
					fetchedOrders.push({
						...res.data[key],
						id: key,
					});
				}

				this.setState({ loading: false, orders: fetchedOrders });
			})
			.catch((err) => {
				this.setState({ loading: false });
			});
	}

	render() {
		return (
			<div>
				<h2 style={styles}>Orders</h2>
				{this.state.orders.map((order) => (
					<Order key={order.id} ingredients={order.ingredients} price={order.price} />
				))}
			</div>
		);
	}
}

const styles = {
	margin: '20px auto',
	width: '80%',
};

export default withErrorHandler(Orders, axios);
