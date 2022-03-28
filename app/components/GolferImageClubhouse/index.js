import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, GolferImg } from './styled';
import Golfer3Image from './Golfer3Image';
import SuperPunchHost from './SuperPunchHost';
import ArtistGolferImage from './ArtistGolferImage';

const GolferImage = props => {
  const renderGolfer = shapeIndex => {
    if (props.sex === 10 || props.sex === 11 || props.sex === 12) {
      return (
        <SuperPunchHost
          className={props.className}
          style={props.style}
          sex={props.sex}
        />
      );
    }

    if (props.sex >= 13) {
      return (
        <ArtistGolferImage
          className={props.className}
          style={props.style}
          sex={props.sex}
        />
      );
    }
    if (+shapeIndex === 1) {
      return (
        <GolferImg className={props.className ? props.className : 'relative h-full si-1'} style={{ ...props.style }}><div>
          <Avatar
            src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/golf_driver_${
              props.driverIndex
            }.svg`)}
            alt="mouth"
          />
          {props.sex === 0 ? (
            <>
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/girl_body_${
                  props.skinToneIndex
                }.svg`)}
                alt="body"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/girl_face_${
                  props.skinToneIndex
                }.svg`)}
                alt="head"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/girl_mouth_${
                  props.mouthIndex
                }.svg`)}
                alt="mouth"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/eyebrow_${
                  props.eyebrowIndex
                }.svg`)}
                alt="eyebrow"
              />
              <Avatar
                src={
                  require(`../../images/GolfersNew/eyes_${props.eyeIndex}.svg`) // eslint-disable-line global-require
                }
                alt="eyes"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/girl_hair_${
                  props.hairIndex
                }.svg`)}
                alt="hair"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/girl_shirt_${
                  props.shirtIndex
                }.svg`)}
                alt="shirt"
              />
              {props.pantsIndex <= 8 ? (
                <Avatar
                  src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/girl_pant_${
                    props.pantsIndex
                  }.svg`)}
                  alt="pants"
                />
              ) : (
                <Avatar
                  src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/skirt_${
                    props.pantsIndex
                  }.svg`)}
                  alt="skirt"
                />
              )}
            </>
          ) : (
            <>
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/man_body_${
                  props.skinToneIndex
                }.svg`)}
                alt="body"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/man_face_${
                  props.skinToneIndex
                }.svg`)}
                alt="head"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/man_mouth_${
                  props.mouthIndex
                }.svg`)}
                alt="mouth"
              />
              {props.sexAttribute1Index > 0 && (
                <Avatar
                  src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/man_beard_${
                    props.sexAttribute1Index
                  }.svg`)}
                  alt="beard"
                />
              )}
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/eyebrow_${
                  props.eyebrowIndex
                }.svg`)}
                alt="eyebrow"
              />
              <Avatar
                src={
                  require(`../../images/GolfersNew/eyes_${props.eyeIndex}.svg`) // eslint-disable-line global-require
                }
                alt="eyes"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/man_hair_${
                  props.hairIndex
                }.svg`)}
                alt="hair"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/man_shirt_${
                  props.shirtIndex
                }.svg`)}
                alt="shirt"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/man_pant_${
                  props.pantsIndex
                }.svg`)}
                alt="pants"
              />
            </>
          )}
          <>
            <Avatar
              src={
                require(`../../images/GolfersNew/nose_${props.noseIndex}.svg`) // eslint-disable-line global-require
              }
              alt="nose"
            />
            {props.glassesIndex > 0 && (
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/glasses_${
                  props.glassesIndex
                }.svg`)}
                alt="glasses"
              />
            )}
            {props.hatIndex > 0 && (
              <>
                {props.hatIndex <= 7 ? (
                  <Avatar
                    src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/hat_${
                      props.hatIndex
                    }.svg`)}
                    alt="hat"
                  />
                ) : (
                  <Avatar
                    src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/visor_${
                      props.hatIndex
                    }.svg`)}
                    alt="visor"
                  />
                )}
              </>
            )}
            <Avatar
              src={
                require(`../../images/GolfersNew/shoes_${props.shoeIndex}.svg`) // eslint-disable-line global-require
              }
              alt="shoe"
            />
          </>
          </div></GolferImg>
      );
    }
    if (+shapeIndex === 2) {
      return (
        <GolferImg className={props.className ? props.className : 'relative h-full si-2'} style={{ ...props.style }}><div>
          {props.sex === 0 ? (
            <>
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_girl_body_${
                  props.skinToneIndex
                }.svg`)}
                alt="body"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_girl_face_${
                  props.skinToneIndex
                }.svg`)}
                alt="head"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_eyebrow_${
                  props.eyebrowIndex
                }.svg`)}
                alt="eyebrow"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_eyes_${
                  props.eyeIndex
                }.svg`)}
                alt="eyes"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_girl_mouth_${
                  props.mouthIndex
                }.svg`)}
                alt="mouth"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_girl_hair_${
                  props.hairIndex
                }.svg`)}
                alt="hair"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_girl_shirt_${
                  props.shirtIndex
                }.svg`)}
                alt="shirt"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_girl_pants_${
                  props.pantsIndex
                }.svg`)}
                alt="pants"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_girl_shoes_${
                  props.shoeIndex
                }.svg`)}
                alt="shoe"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_girl_drivers_${
                  props.driverIndex
                }.svg`)}
                alt="driver"
              />
            </>
          ) : (
            <>
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_men_body_${
                  props.skinToneIndex
                }.svg`)}
                alt="body"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_men_face_${
                  props.skinToneIndex
                }.svg`)}
                alt="head"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_eyebrow_${
                  props.eyebrowIndex
                }.svg`)}
                alt="eyebrow"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_eyes_${
                  props.eyeIndex
                }.svg`)}
                alt="eyes"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_men_mouth_${
                  props.mouthIndex
                }.svg`)}
                alt="mouth"
              />
              {props.sexAttribute1Index > 0 && (
                <Avatar
                  src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_men_beard_${
                    props.sexAttribute1Index
                  }.svg`)}
                  alt="beard"
                />
              )}
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_men_hair_${
                  props.hairIndex
                }.svg`)}
                alt="hair"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_men_shirt_${
                  props.shirtIndex
                }.svg`)}
                alt="shirt"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_men_pants_${
                  props.pantsIndex
                }.svg`)}
                alt="pants"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_men_shoes_${
                  props.shoeIndex
                }.svg`)}
                alt="shoe"
              />
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_men_drivers_${
                  props.driverIndex
                }.svg`)}
                alt="driver"
              />
            </>
          )}
          <>
            <Avatar
              src={
                require(`../../images/GolfersNew/2_nose_${props.noseIndex}.svg`) // eslint-disable-line global-require
              }
              alt="nose"
            />
            {props.glassesIndex > 0 && (
              <Avatar
                src={require(/* eslint-disable-line global-require */ `../../images/GolfersNew/2_glasses_${
                  props.glassesIndex
                }.svg`)}
                alt="glasses"
              />
            )}
            {props.hatIndex !== 0 && (
              <Avatar
                src={
                  require(`../../images/GolfersNew/2_hat_${props.hatIndex}.svg`) // eslint-disable-line global-require
                }
                alt="hat"
              />
            )}
          </>
          </div></GolferImg>
      );
    }

    return (
      <Golfer3Image
        className={props.className}
        style={props.style}
        image_url={props.image_url}
      />
    );
  };

  return <>{renderGolfer(props.shape)}</>;
};

GolferImage.propTypes = {
  /*eslint-disable */
  style: PropTypes.object,
  className: PropTypes.string,
  shape: PropTypes.number,
  sex: PropTypes.number,
  driverIndex: PropTypes.number,
  skinToneIndex: PropTypes.number,
  eyeIndex: PropTypes.number,
  noseIndex: PropTypes.number,
  mouthIndex: PropTypes.number,
  eyebrowIndex: PropTypes.number,
  hairIndex: PropTypes.number,
  hatIndex: PropTypes.number,
  pantsIndex: PropTypes.number,
  shirtIndex: PropTypes.number,
  shoeIndex: PropTypes.number,
  glassesIndex: PropTypes.number,
  sexAttribute1Index: PropTypes.number,
  /* eslint-enable */
};

export default GolferImage;
