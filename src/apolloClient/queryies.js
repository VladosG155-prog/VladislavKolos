import { gql } from '@apollo/client';

export const getCategories = gql`
	query {
		categories {
			name
		}
	}
`;

export const getCurrencies = gql`
	query {
		currencies {
			label
			symbol
		}
	}
`;

export const getItemsByCategory = gql`
	query getProductsByCategory($title: String!) {
		category(input: { title: $title }) {
			products {
				id
				name
				brand
				gallery
				inStock
				attributes {
					id
					name
					type
					items {
						displayValue
						id
						value
					}
				}
				prices {
					currency {
						label
						symbol
					}
					amount
				}
			}
		}
	}
`;

export const getProductById = gql`
	query getProductById($id: String!) {
		product(id: $id) {
			name
			gallery
			description
			category
			id
			brand
			prices {
				currency {
					label
					symbol
				}
				amount
			}
			attributes {
				id
				name
				type
				items {
					displayValue
					id
					value
				}
			}
		}
	}
`;
