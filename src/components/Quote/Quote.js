
import './Quote.css';

export default function Quote({quotes}) {
	


	return (
		<figure className='quote'>
			<blockquote cite='https://www.huxley.net/bnw/four.html'>
				<p>
					{quotes[0].dialog}
				</p>
			</blockquote>
		</figure>
	);
}
