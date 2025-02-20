import React from 'react';
import { Button } from '@strapi/design-system/Button';
import Eye from '@strapi/icons/Eye';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { useIntl } from 'react-intl';

interface Layout {
  apiID?: string;
  kind?: string;
}

const PreviewButton = () => {
  const { modifiedData, layout } = useCMEditViewDataManager();
  const { formatMessage } = useIntl();
  const bannedApiID = ['category'];

  if (!layout || !layout.apiID) {
    return null;
  }

  if (bannedApiID.includes(layout.apiID)) {
    return null;
  }

  const handlePreview = () => {
    const previewUrl = `${process.env.STRAPI_ADMIN_CLIENT_URL}/api/preview?secret=${process.env.STRAPI_ADMIN_CLIENT_PREVIEW_SECRET}&slug=${modifiedData.slug}&locale=${modifiedData.locale}&apiID=${layout.apiID}&kind=${layout.kind}`;
    
    const newWindow = window.open(previewUrl, '_blank');
    if (newWindow) {
      newWindow.focus();
    }
  };

  const content = {
    id: 'components.PreviewButton.button',
    defaultMessage: 'Preview',
  };

  return (
    <Button onClick={handlePreview} variant="secondary" startIcon={<Eye />}>
      {formatMessage(content)}
    </Button>
  );
};

export default PreviewButton;