import React from 'react';

export class ItemAttributes extends React.Component {
	render() {
		return (
			<div>
				{this.props.attr
					? this.props.attr.map((item) => (
							<div key={item.id} className="attr-wrap">
								<p className="paragraph-bold">{item.name}</p>
								<div className="attr-flex">
									{item.name === 'Color'
										? item.items.map((el) => (
												<span
													key={el.id}
													className={[
														'colorBox',
														this.props.params[item.name] === el.value ? 'active' : '',
													].join(' ')}
													onClick={() => this.props.getAttributes(item.name, el.value)}
													style={{ backgroundColor: `${el.value}` }}></span>
										  ))
										: item.items.map((el) => (
												<span
													key={el.id}
													onClick={() => this.props.getAttributes(item.name, el.value)}
													className={[
														'box',
														this.props.params[item.name] === el.value ? 'active' : '',
													].join(' ')}>
													{el.value}
												</span>
										  ))}
								</div>
							</div>
					  ))
					: null}
			</div>
		);
	}
}
export class ItemCartAttributes extends React.Component {
	render() {
		return (
			<div>
				{this.props.attr
					? this.props.attr.map((item) => (
							<div key={item.id} className="attr-wrap">
								<p className="paragraph-bold">{item.name}</p>
								<div className="attr-flex">
									{item.name === 'Color'
										? item.items.map((el) => (
												<span
													key={el.id}
													className={[
														'colorBox',
														this.props.params[item.name] === el.value ? 'active' : '',
													].join(' ')}
													style={{ backgroundColor: `${el.value}` }}></span>
										  ))
										: item.items.map((el) => (
												<span
													key={el.id}
													className={[
														'box',
														this.props.params[item.name] === el.value ? 'active' : '',
													].join(' ')}>
													{el.value}
												</span>
										  ))}
								</div>
							</div>
					  ))
					: null}
			</div>
		);
	}
}
