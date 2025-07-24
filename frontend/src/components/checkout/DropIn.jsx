import { useEffect, useRef } from 'react';
import dropin from 'braintree-web-drop-in';
import '../../styles/dropin.css';

const DropIn = ({ clientToken, setInstance }) => {
  const dropinContainer = useRef(null);

  useEffect(() => {
    if (clientToken && dropinContainer.current) {
      dropin.create({
        authorization: clientToken,
        container: dropinContainer.current,
        // paypal: {
        //               flow: 'vault'
        //           }
      }, (err, instance) => {
        if (err) {
          console.error('DropIn error:', err);
        } else {
          setInstance(instance); // esto lo necesitás después para `requestPaymentMethod`
        }
      });
    }
  }, [clientToken]);

  return (
    <div ref={dropinContainer} className="border border-gray-300 p-4 min-h-[150px]" />
  );
};

export default DropIn;