import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeProps {
  value: string;
}

const QRCodeComponent: React.FC<QRCodeProps> = ({ value }) => {
  return <QRCodeSVG value={value} level={'H'} size={512} />;
};

export default QRCodeComponent;