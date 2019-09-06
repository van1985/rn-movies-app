import Adapter from 'enzyme-adapter-react-16'; // eslint-disable-line
import Enzyme from 'enzyme'; // eslint-disable-line

Enzyme.configure({ adapter: new Adapter() });

global.fetch = jest.fn();
