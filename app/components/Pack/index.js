/**
 *
 * Pack
 *
 */

import React, { memo, useState } from 'react';
import { object } from 'prop-types';
import { purchaseBlockletePack } from 'utils/flow/flowConnector';
import { Card, Button } from './styled';
import { apiLocation } from '../../config';

function Pack({ pack }) {
  const [loading, setLoading] = useState(false);

  const reserveThePack = async (dropnumber, price) => {
    const obj = {
      dropnumber,
    };

    await fetch(`${apiLocation}/private/pack/reserve`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('ItasGolfToken')}`,
      },
      body: JSON.stringify(obj),
    })
      .then(res => res.text())
      .then(async body => {
        const reservation = JSON.parse(body);
        if (reservation.reserved) {
          purchaseBlockletePack(price.toFixed(2))
            .then(resp => {
              console.log('txn = ', resp);
              setLoading(false);
            })
            .catch(() => {
              console.log('Getting an error');
              setLoading(false);
            });
        } else {
          console.log('Show an error because could not purchase');
          setLoading(false);
        }
      });
  };

  return (
    <Card>
      <div>{pack.name}</div>
      <div>Total Packs: {pack.numberofpacks}</div>
      <div>Golfers per Pack: {pack.golfersperpack}</div>
      <div>${pack.price}</div>
      <Button
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          await reserveThePack(pack.id, pack.price);
          //    /private/pack/reserve
          // Reserve a pack
          // On reserved, call the payment to our vault.
          // Once paid, handle on service.
        }}
      >
        Purchase
      </Button>
    </Card>
  );
}

Pack.propTypes = {
  pack: object.isRequired,
};

export default memo(Pack);
