export class UploadDocumentAttachmentsDetails {
  attachments: UploadAttachmentResponse[];
}

export class GovernmentIdUploadDetails {
  fileName: string;
  documentType: string;
}

export class DocumentUploadDetails {
  fileName: string;
}

export class AttachmentType {
  label: string;
  type: string;
}

export class UploadAttachmentResponse {
  originalFileName: string;
  systemGeneratedFileName: string;
  fileType: string;
}
