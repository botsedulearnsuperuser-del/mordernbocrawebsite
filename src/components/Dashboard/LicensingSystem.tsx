import React, { useState, useMemo } from 'react';
import './LicensingSystem.css';

// ─── Types ────────────────────────────────────────────────────────────────────

type LicenseStatus = 'draft' | 'under_review' | 'info_requested' | 'approved' | 'rejected';

interface LicenseDef {
  id: string;
  name: string;
  category: string;
  description: string;
  fee: string;
  processingDays: string;
  fields: FormFieldDef[];
  requiredDocs: DocRequirement[];
  wizardTags: string[];
}

interface FormFieldDef {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'email' | 'tel' | 'file' | 'checkbox';
  placeholder?: string;
  options?: string[];
  required: boolean;
  shared?: boolean; // shared across all licenses
  conditionalOn?: { field: string; value: string };
  repeatable?: boolean;
}

interface DocRequirement {
  id: string;
  name: string;
  description: string;
  sensitive: boolean;
  accepted: string[];
}

interface UploadedFile {
  docId: string;
  file: File;
  refId: string;
}

interface ApplicationDraft {
  id: string;
  licenseIds: string[];
  formData: Record<string, string>;
  uploadedDocs: UploadedFile[];
  status: LicenseStatus;
  submittedAt?: string;
  createdAt: string;
  version: number;
}

// ─── License Schema (Dynamic Data-Driven) ─────────────────────────────────────

const SHARED_FIELDS: FormFieldDef[] = [
  { id: 'applicant_name',     label: 'Applicant Full Name',       type: 'text',     placeholder: 'e.g. Thabo Mokoena',      required: true,  shared: true },
  { id: 'company_name',       label: 'Company / Organisation',    type: 'text',     placeholder: 'e.g. Mascom Wireless',     required: true,  shared: true },
  { id: 'reg_number',         label: 'Company Registration No.',  type: 'text',     placeholder: 'e.g. BW-2019-00123',      required: true,  shared: true },
  { id: 'email',              label: 'Contact Email',             type: 'email',    placeholder: 'official@company.bw',      required: true,  shared: true },
  { id: 'phone',              label: 'Contact Phone',             type: 'tel',      placeholder: '+267 7X XXX XXX',          required: true,  shared: true },
  { id: 'physical_address',   label: 'Physical Address',          type: 'textarea', placeholder: 'Plot No, Village, District', required: true, shared: true },
  { id: 'business_description',label: 'Business Description',     type: 'textarea', placeholder: 'Brief description of business operations', required: true, shared: true },
];

const LICENSE_CATALOG: LicenseDef[] = [
  {
    id: 'isp',
    name: 'Internet Service Provider (ISP)',
    category: 'ICT',
    description: 'Licence to provide internet connectivity services to consumers and businesses.',
    fee: 'BWP 15,000',
    processingDays: '30',
    wizardTags: ['internet', 'isp', 'broadband', 'network'],
    fields: [
      { id: 'network_architecture', label: 'Network Architecture', type: 'textarea', placeholder: 'Describe the proposed network topology', required: true },
      { id: 'coverage_plan',        label: 'Coverage Plan',        type: 'textarea', placeholder: 'Areas intended to be served',           required: true },
      { id: 'bandwidth_capacity',   label: 'Total Bandwidth Capacity (Mbps)', type: 'number', placeholder: 'e.g. 10000', required: true },
      { id: 'peering_arrangement',  label: 'Peering / Transit Arrangement', type: 'select', options: ['Local IXP Only', 'International Transit', 'Both'], required: true },
    ],
    requiredDocs: [
      { id: 'cert_inc', name: 'Certificate of Incorporation', description: 'Certified copy from CIPA', sensitive: false, accepted: ['.pdf', '.jpg', '.png'] },
      { id: 'net_diagram', name: 'Network Diagram', description: 'Technical network architecture drawing', sensitive: false, accepted: ['.pdf', '.png', '.jpg', '.visio'] },
      { id: 'fin_statement', name: 'Audited Financial Statements', description: 'Last 2 years audited financials', sensitive: true, accepted: ['.pdf'] },
      { id: 'biz_plan', name: 'Business Plan', description: '3-year business plan', sensitive: false, accepted: ['.pdf', '.docx'] },
    ],
  },
  {
    id: 'radio',
    name: 'Radio Frequency Licence',
    category: 'Radio',
    description: 'Licence to use specific radio frequency bands for communications or broadcasting.',
    fee: 'BWP 8,000',
    processingDays: '21',
    wizardTags: ['radio', 'frequency', 'spectrum', 'wireless', 'fm', 'rf'],
    fields: [
      { id: 'frequency_band',    label: 'Frequency Band (MHz)',   type: 'text',   placeholder: 'e.g. 900 MHz',          required: true },
      { id: 'transmission_area', label: 'Transmission Coverage Area', type: 'textarea', placeholder: 'Districts/areas covered', required: true },
      { id: 'equipment_type',    label: 'Equipment Type / Model',    type: 'text',   placeholder: 'e.g. Ericsson RBS 6000', required: true },
      { id: 'transmit_power',    label: 'Transmit Power (Watts)',     type: 'number', placeholder: 'e.g. 50',               required: true },
      { id: 'antenna_height',    label: 'Antenna Height (Metres)',    type: 'number', placeholder: 'e.g. 45',               required: false },
    ],
    requiredDocs: [
      { id: 'cert_inc',      name: 'Certificate of Incorporation',   description: 'Certified copy from CIPA',           sensitive: false, accepted: ['.pdf', '.jpg'] },
      { id: 'equip_spec',    name: 'Equipment Specifications Sheet', description: 'ITU-compliant technical specs',      sensitive: false, accepted: ['.pdf'] },
      { id: 'site_plan',     name: 'Site Plan / Diagram',           description: 'Location map and antenna diagram',   sensitive: false, accepted: ['.pdf', '.png'] },
      { id: 'itu_cert',      name: 'ITU Type Approval Certificate', description: 'Equipment type approval proof',      sensitive: false, accepted: ['.pdf'] },
    ],
  },
  {
    id: 'broadcasting',
    name: 'Broadcasting Service Licence',
    category: 'Broadcasting',
    description: 'Licence to operate radio or television broadcasting services.',
    fee: 'BWP 25,000',
    processingDays: '45',
    wizardTags: ['broadcasting', 'television', 'tv', 'radio station', 'media', 'fm', 'am'],
    fields: [
      { id: 'broadcast_type',    label: 'Broadcast Type',             type: 'select',   options: ['Radio (FM)', 'Radio (AM)', 'Digital TV', 'Satellite TV', 'Community Radio'], required: true },
      { id: 'content_category',  label: 'Content Category',           type: 'select',   options: ['News & Current Affairs', 'Entertainment', 'Religious', 'Educational', 'General'], required: true },
      { id: 'target_audience',   label: 'Target Audience',            type: 'textarea', placeholder: 'Describe your intended audience',                                                  required: true },
      { id: 'broadcast_hours',   label: 'Proposed Broadcast Hours/Day', type: 'number', placeholder: 'e.g. 18',                                                                         required: true },
      { id: 'content_plan',      label: 'Content Plan / Schedule',    type: 'textarea', placeholder: 'Describe your programming schedule',                                               required: true },
    ],
    requiredDocs: [
      { id: 'cert_inc',      name: 'Certificate of Incorporation',    description: 'Certified copy from CIPA',          sensitive: false, accepted: ['.pdf'] },
      { id: 'content_policy', name: 'Content Policy Document',       description: 'Editorial and content standards',   sensitive: false, accepted: ['.pdf', '.docx'] },
      { id: 'fin_statement', name: 'Audited Financial Statements',   description: 'Last 2 years audited financials',   sensitive: true,  accepted: ['.pdf'] },
      { id: 'broadcast_plan', name: 'Broadcast Infrastructure Plan', description: 'Technical broadcast setup plan',    sensitive: false, accepted: ['.pdf'] },
    ],
  },
  {
    id: 'postal',
    name: 'Postal & Courier Services Licence',
    category: 'Postal',
    description: 'Licence to operate postal or courier delivery services within Botswana.',
    fee: 'BWP 5,000',
    processingDays: '14',
    wizardTags: ['postal', 'courier', 'delivery', 'mail', 'parcel'],
    fields: [
      { id: 'service_area',      label: 'Service Coverage Area',   type: 'textarea', placeholder: 'Districts and villages covered',       required: true },
      { id: 'fleet_size',        label: 'Fleet Size (Vehicles)',   type: 'number',   placeholder: 'e.g. 12',                              required: true },
      { id: 'tracking_system',   label: 'Tracking System Used',   type: 'select',   options: ['GPS Tracking', 'Barcode Scanning', 'Both', 'Manual'], required: true },
      { id: 'delivery_sla',      label: 'Delivery SLA (Days)',     type: 'number',   placeholder: 'e.g. 3',                               required: true },
    ],
    requiredDocs: [
      { id: 'cert_inc',       name: 'Certificate of Incorporation', description: 'Certified copy from CIPA',                    sensitive: false, accepted: ['.pdf'] },
      { id: 'vehicle_reg',    name: 'Vehicle Registration Docs',   description: 'Registration of all delivery vehicles',        sensitive: false, accepted: ['.pdf', '.jpg'] },
      { id: 'insurance',      name: 'Insurance Certificate',       description: 'Fleet and goods-in-transit insurance',         sensitive: false, accepted: ['.pdf'] },
    ],
  },
  {
    id: 'vans',
    name: 'Value Added Network Services (VANS)',
    category: 'ICT',
    description: 'Licence for enhanced data services over existing telecom infrastructure.',
    fee: 'BWP 10,000',
    processingDays: '21',
    wizardTags: ['vans', 'data services', 'voip', 'cloud', 'managed services'],
    fields: [
      { id: 'service_type',   label: 'Service Type',            type: 'select',   options: ['VoIP', 'Managed Data Services', 'Cloud Hosting', 'IoT Platform', 'Other'], required: true },
      { id: 'tech_description', label: 'Technical Description', type: 'textarea', placeholder: 'Describe the technical architecture of the service', required: true },
      { id: 'interoperability', label: 'Interoperability Plan', type: 'textarea', placeholder: 'How will the service integrate with existing networks?', required: true },
    ],
    requiredDocs: [
      { id: 'cert_inc',    name: 'Certificate of Incorporation',  description: 'Certified copy from CIPA',   sensitive: false, accepted: ['.pdf'] },
      { id: 'tech_spec',   name: 'Technical Specification Sheet', description: 'Detailed service tech spec', sensitive: false, accepted: ['.pdf', '.docx'] },
      { id: 'fin_statement', name: 'Financial Statements',        description: 'Last 2 years financials',    sensitive: true,  accepted: ['.pdf'] },
    ],
  },
  {
    id: 'type_approval',
    name: 'Type Approval (Equipment)',
    category: 'Radio',
    description: 'Approval for telecommunications equipment to be sold/used in Botswana.',
    fee: 'BWP 2,500',
    processingDays: '14',
    wizardTags: ['type approval', 'equipment', 'device', 'import', 'handset', 'modem'],
    fields: [
      { id: 'equipment_name',   label: 'Equipment Name / Model',   type: 'text',   placeholder: 'e.g. Samsung Galaxy A55',        required: true },
      { id: 'manufacturer',     label: 'Manufacturer',             type: 'text',   placeholder: 'e.g. Samsung Electronics Co.',   required: true },
      { id: 'origin_country',   label: 'Country of Origin',        type: 'text',   placeholder: 'e.g. South Korea',               required: true },
      { id: 'equipment_category', label: 'Equipment Category',     type: 'select', options: ['Mobile Handset', 'Modem/Router', 'Radio Transmitter', 'Satellite Receiver', 'Other'], required: true },
      { id: 'intended_use',     label: 'Intended Use',             type: 'textarea', placeholder: 'Describe the intended use of the equipment', required: true },
    ],
    requiredDocs: [
      { id: 'itu_cert',    name: 'ITU/FCC/CE Certification', description: 'International type approval certificate',    sensitive: false, accepted: ['.pdf'] },
      { id: 'equip_manual', name: 'Equipment User Manual',   description: 'Official equipment user documentation',      sensitive: false, accepted: ['.pdf'] },
      { id: 'test_report', name: 'Test/EMC Report',          description: 'Laboratory test report for the equipment',   sensitive: false, accepted: ['.pdf'] },
    ],
  },
];

const WIZARD_QUESTIONS = [
  { id: 'q1', question: 'What does your business primarily do?', options: ['Provide internet access to customers', 'Operate a radio/TV station', 'Deliver packages or mail', 'Sell or import telecom equipment', 'Provide cloud or VoIP services', 'Use radio frequencies for my business'] },
  { id: 'q2', question: 'What is your intended reach?',          options: ['Nationwide', 'Regional / District', 'Community / Local', 'Specific Sites Only'] },
  { id: 'q3', question: 'What best describes your organisation?', options: ['Established Company', 'New Start up', 'Public Entity / Government', 'NGO / Non profit'] },
];

const WIZARD_RECOMMENDATIONS: Record<string, string[]> = {
  'Provide internet access to customers': ['isp', 'vans'],
  'Operate a radio/TV station':           ['broadcasting', 'radio'],
  'Deliver packages or mail':             ['postal'],
  'Sell or import telecom equipment':     ['type_approval'],
  'Provide cloud or VoIP services':       ['vans', 'isp'],
  'Use radio frequencies for my business':['radio', 'type_approval'],
};

const STATUS_META: Record<LicenseStatus, { label: string; color: string; icon: string }> = {
  draft:            { label: 'Draft',              color: '#6b7280', icon: '' },
  under_review:     { label: 'Under Review',       color: '#f59e0b', icon: '' },
  info_requested:   { label: 'Info Requested',     color: '#ef4444', icon: '' },
  approved:         { label: 'Approved',           color: '#22c55e', icon: '' },
  rejected:         { label: 'Rejected',           color: '#dc2626', icon: '' },
};

// ─── Helper to generate unique IDs ───────────────────────────────────────────

const uid = () => `ref-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

// ─── Sub-components ──────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
    <path fill="currentColor" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83z"/>
  </svg>
);

const StepBar: React.FC<{ steps: string[]; current: number }> = ({ steps, current }) => (
  <div className="ls-stepbar">
    {steps.map((s, i) => (
      <React.Fragment key={s}>
        <div className={`ls-step ${i <= current ? 'active' : ''} ${i < current ? 'done' : ''}`}>
          <div className="ls-step-dot">{i < current ? <CheckIcon /> : i + 1}</div>
          <span className="ls-step-label">{s}</span>
        </div>
        {i < steps.length - 1 && <div className={`ls-step-line ${i < current ? 'done' : ''}`} />}
      </React.Fragment>
    ))}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

type View = 'home' | 'discover' | 'wizard' | 'form' | 'docs' | 'review' | 'submitted' | 'tracker';

const LicensingSystem: React.FC = () => {
  const [view, setView]                         = useState<View>('home');
  const [step, setStep]                         = useState(0);
  const [search, setSearch]                     = useState('');
  const [categoryFilter, setCategoryFilter]     = useState('All');
  const [selectedIds, setSelectedIds]           = useState<string[]>([]);
  const [wizardStep, setWizardStep]             = useState(0);
  const [wizardAnswers, setWizardAnswers]       = useState<string[]>([]);
  const [wizardResults, setWizardResults]       = useState<string[] | null>(null);
  const [formData, setFormData]                 = useState<Record<string, string>>({});
  const [uploadedDocs, setUploadedDocs]         = useState<UploadedFile[]>([]);
  const [applications, setApplications]         = useState<ApplicationDraft[]>([
    {
      id: uid(),
      licenseIds: ['isp'],
      formData: { applicant_name: 'Amogelang Tshukudu', company_name: 'Orange Botswana', reg_number: 'BW-2018-00456', email: 'Amogelang.Tshukudu@orangebotswana.com', phone: '+267 71 234 567', physical_address: 'Plot 50370, Fairground, Gaborone', business_description: 'National telecommunications provider.', network_architecture: 'Hybrid fibre-LTE network', coverage_plan: 'Nationwide', bandwidth_capacity: '100000', peering_arrangement: 'Both' },
      uploadedDocs: [],
      status: 'under_review',
      submittedAt: '2026-03-10T09:30:00Z',
      createdAt: '2026-03-08T11:00:00Z',
      version: 1,
    },
    {
      id: uid(),
      licenseIds: ['radio'],
      formData: { applicant_name: 'Amogelang Tshukudu', company_name: 'Orange Botswana', reg_number: 'BW-2018-00456', email: 'Amogelang.Tshukudu@orangebotswana.com', phone: '+267 71 234 567', physical_address: 'Plot 50370, Fairground, Gaborone', business_description: 'National telecommunications provider.', frequency_band: '900 MHz & 1800 MHz', transmission_area: 'Nationwide', equipment_type: 'Ericsson RBS 6000', transmit_power: '50' },
      uploadedDocs: [],
      status: 'approved',
      submittedAt: '2026-02-15T08:00:00Z',
      createdAt: '2026-02-12T14:00:00Z',
      version: 2,
    },
  ]);
  const [consentGiven, setConsentGiven]         = useState(false);
  const [activeTrackerId, setActiveTrackerId]   = useState<string | null>(null);

  // ── Derived data ─────────────────────────────────────────────────────────

  const selectedLicenses = useMemo(() =>
    LICENSE_CATALOG.filter(l => selectedIds.includes(l.id)),
  [selectedIds]);

  const allFields = useMemo(() => {
    const sharedOnce = SHARED_FIELDS;
    const specificFields: FormFieldDef[] = [];
    selectedLicenses.forEach(lic => {
      lic.fields.forEach(f => {
        if (!specificFields.find(sf => sf.id === `${lic.id}_${f.id}`)) {
          specificFields.push({ ...f, id: `${lic.id}_${f.id}`, label: selectedLicenses.length > 1 ? `[${lic.name}] ${f.label}` : f.label });
        }
      });
    });
    return [...sharedOnce, ...specificFields];
  }, [selectedLicenses]);

  const allDocs = useMemo(() => {
    const map = new Map<string, { doc: DocRequirement; licenseNames: string[] }>();
    selectedLicenses.forEach(lic => {
      lic.requiredDocs.forEach(d => {
        if (map.has(d.id)) {
          map.get(d.id)!.licenseNames.push(lic.name);
        } else {
          map.set(d.id, { doc: d, licenseNames: [lic.name] });
        }
      });
    });
    return Array.from(map.values());
  }, [selectedLicenses]);

  const categories = useMemo(() => ['All', ...Array.from(new Set(LICENSE_CATALOG.map(l => l.category)))], []);

  const filteredLicenses = useMemo(() => {
    return LICENSE_CATALOG.filter(l => {
      const matchesCat    = categoryFilter === 'All' || l.category === categoryFilter;
      const matchesSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.description.toLowerCase().includes(search.toLowerCase()) || l.wizardTags.some(t => t.includes(search.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [search, categoryFilter]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const toggleLicense = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleFormChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleFileUpload = (docId: string, file: File) => {
    setUploadedDocs(prev => {
      const filtered = prev.filter(u => u.docId !== docId);
      return [...filtered, { docId, file, refId: uid() }];
    });
  };

  const handleSubmit = () => {
    const draft: ApplicationDraft = {
      id: uid(),
      licenseIds: selectedIds,
      formData,
      uploadedDocs,
      status: 'under_review',
      submittedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      version: 1,
    };
    setApplications(prev => [...prev, draft]);
    setView('submitted');
    setStep(0);
  };

  const handleSaveDraft = () => {
    const draft: ApplicationDraft = {
      id: uid(),
      licenseIds: selectedIds,
      formData,
      uploadedDocs,
      status: 'draft',
      createdAt: new Date().toISOString(),
      version: 1,
    };
    setApplications(prev => [...prev, draft]);
    alert('Draft saved successfully.');
  };

  const startApplication = (ids?: string[]) => {
    const useIds = ids || selectedIds;
    setSelectedIds(useIds);
    setFormData({});
    setUploadedDocs([]);
    setConsentGiven(false);
    setStep(0);
    setView('form');
  };

  const wizardRecommend = () => {
    const firstAnswer = wizardAnswers[0];
    const rec = WIZARD_RECOMMENDATIONS[firstAnswer] || [];
    setWizardResults(rec);
  };

  const resumeDraft = (app: ApplicationDraft) => {
    setSelectedIds(app.licenseIds);
    setFormData(app.formData);
    setUploadedDocs(app.uploadedDocs);
    setConsentGiven(false);
    setStep(0);
    setView('form');
  };

  // ─── Render helpers ───────────────────────────────────────────────────────

  const renderField = (field: FormFieldDef) => {
    const val = formData[field.id] || '';
    const baseProps = {
      id: field.id,
      required: field.required,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => handleFormChange(field.id, e.target.value),
    };

    return (
      <div key={field.id} className="ls-field-group">
        <label htmlFor={field.id} className="ls-label">
          {field.label} {field.required && <span className="ls-required">*</span>}
          {field.shared && <span className="ls-shared-badge">Shared</span>}
        </label>
        {field.type === 'textarea' ? (
          <textarea {...baseProps} value={val} className="ls-input ls-textarea" placeholder={field.placeholder} rows={3} />
        ) : field.type === 'select' ? (
          <select {...baseProps} value={val} className="ls-input ls-select">
            <option value="">Select an option…</option>
            {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : (
          <input {...baseProps} type={field.type} value={val} className="ls-input" placeholder={field.placeholder} />
        )}
      </div>
    );
  };

  const renderDocUpload = (entry: { doc: DocRequirement; licenseNames: string[] }) => {
    const { doc, licenseNames } = entry;
    const uploaded = uploadedDocs.find(u => u.docId === doc.id);
    return (
      <div key={doc.id} className={`ls-doc-card ${uploaded ? 'uploaded' : ''}`}>
        <div className="ls-doc-header">
          <div>
            <div className="ls-doc-name">
              {doc.sensitive && <span className="ls-sensitive-badge">Sensitive</span>}
              {doc.name}
            </div>
            <div className="ls-doc-desc">{doc.description}</div>
            {licenseNames.length > 1 && (
              <div className="ls-doc-shared">Shared by: {licenseNames.join(', ')}</div>
            )}
            <div className="ls-doc-accept">Accepted: {doc.accepted.join(', ')}</div>
          </div>
          <div className="ls-doc-status">
            {uploaded ? (
              <div className="ls-doc-uploaded">
                <span className="ls-doc-check">✓</span>
                <span className="ls-doc-filename">{uploaded.file.name}</span>
              </div>
            ) : (
              <label className="ls-upload-btn">
                Upload File
                <input
                  type="file"
                  accept={doc.accepted.join(',')}
                  style={{ display: 'none' }}
                  onChange={e => { if (e.target.files?.[0]) handleFileUpload(doc.id, e.target.files[0]); }}
                />
              </label>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ─── Views ────────────────────────────────────────────────────────────────

  const renderHome = () => (
    <div className="ls-home">
      <div className="ls-home-hero">
        <h2 className="ls-home-title">Licensing &amp; Regulatory Document System</h2>
        <p className="ls-home-subtitle">Apply for BOCRA licences, track your applications, and manage regulatory documents — all in one place.</p>
        <div className="ls-home-actions">
          <button className="ls-btn ls-btn-primary" onClick={() => { setView('discover'); setSelectedIds([]); }}>
            Browse Licences
          </button>
          <button className="ls-btn ls-btn-outline" onClick={() => { setView('wizard'); setWizardStep(0); setWizardAnswers([]); setWizardResults(null); }}>
            Not Sure? Use Wizard
          </button>
          <button className="ls-btn ls-btn-ghost" onClick={() => setView('tracker')}>
            Track Applications
          </button>
        </div>
      </div>

      <div className="ls-home-grid">
        <div className="ls-info-card">
          <h4>Dynamic Forms</h4>
          <p>Forms auto generated based on the licence type. Apply for multiple licences with shared fields filled once.</p>
        </div>
        <div className="ls-info-card">
          <h4>Secure Document Vault</h4>
          <p>Sensitive documents encrypted at rest. Files referenced by ID, never embedded, compliant with Botswana data protection laws.</p>
        </div>
        <div className="ls-info-card">
          <h4>Workflow Tracking</h4>
          <p>Track every application from submission through review, approval or rejection with full audit trail.</p>
        </div>
        <div className="ls-info-card">
          <h4>AI Ready</h4>
          <p>Built for future AI/chatbot integration. Every schema is data driven and extensible, add new licence types without code changes.</p>
        </div>
      </div>

      {applications.length > 0 && (
        <div className="ls-recent">
          <h3 className="ls-section-title">Recent Applications</h3>
          <div className="ls-apps-list">
            {applications.slice(-3).reverse().map(app => {
              const meta = STATUS_META[app.status];
              const names = app.licenseIds.map(id => LICENSE_CATALOG.find(l => l.id === id)?.name || id).join(', ');
              return (
                <div key={app.id} className="ls-app-row" onClick={() => { setActiveTrackerId(app.id); setView('tracker'); }}>
                  <div>
                    <div className="ls-app-name">{names}</div>
                    <div className="ls-app-date">{app.submittedAt ? `Submitted: ${new Date(app.submittedAt).toLocaleDateString()}` : `Draft ${new Date(app.createdAt).toLocaleDateString()}`}</div>
                  </div>
                  <span className="ls-status-badge" style={{ background: meta.color + '20', color: meta.color }}>
                    {meta.icon} {meta.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  const renderDiscover = () => (
    <div className="ls-discover">
      <div className="ls-discover-header">
        <h3 className="ls-section-title">Available Licences</h3>
        <div className="ls-discover-controls">
          <div className="ls-search-wrap">
            <span className="ls-search-icon"></span>
            <input className="ls-search-input" placeholder="Search licences…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="ls-cat-tabs">
            {categories.map(c => (
              <button key={c} className={`ls-cat-tab ${categoryFilter === c ? 'active' : ''}`} onClick={() => setCategoryFilter(c)}>{c}</button>
            ))}
          </div>
        </div>
      </div>

      {selectedIds.length > 0 && (
        <div className="ls-selection-bar">
          <span>{selectedIds.length} licence(s) selected:</span>
          <span className="ls-sel-names">{selectedIds.map(id => LICENSE_CATALOG.find(l => l.id === id)?.name).join(', ')}</span>
          <button className="ls-btn ls-btn-primary ls-btn-sm" onClick={() => startApplication()}>Apply for Selected</button>
        </div>
      )}

      <div className="ls-license-grid">
        {filteredLicenses.map(lic => {
          const isSelected = selectedIds.includes(lic.id);
          return (
            <div key={lic.id} className={`ls-lic-card ${isSelected ? 'selected' : ''}`}>
              <div className="ls-lic-top">
                <span className="ls-lic-category">{lic.category}</span>
                {isSelected && <span className="ls-lic-selected-dot" />}
              </div>
              <h4 className="ls-lic-name">{lic.name}</h4>
              <p className="ls-lic-desc">{lic.description}</p>
              <div className="ls-lic-meta">
                <span>Fee: {lic.fee}</span>
                <span>{lic.processingDays} days</span>
              </div>
              <div className="ls-lic-docs">{lic.requiredDocs.length} docs required</div>
              <div className="ls-lic-actions">
                <button className={`ls-btn ls-btn-sm ${isSelected ? 'ls-btn-outline-red' : 'ls-btn-outline'}`}
                  onClick={() => toggleLicense(lic.id)}>
                  {isSelected ? 'Selected' : 'Select'}
                </button>
                <button className="ls-btn ls-btn-primary ls-btn-sm"
                  onClick={() => startApplication([lic.id])}>
                  Apply Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderWizard = () => {
    if (wizardResults !== null) {
      const recommended = LICENSE_CATALOG.filter(l => wizardResults.includes(l.id));
      return (
        <div className="ls-wizard">
          <h3 className="ls-section-title">Recommended Licences</h3>
          <p className="ls-wizard-sub">Based on your answers, here are the licences that apply to your business:</p>
          <div className="ls-license-grid">
            {recommended.map(lic => {
              const isSelected = selectedIds.includes(lic.id);
              return (
                <div key={lic.id} className={`ls-lic-card ${isSelected ? 'selected' : ''}`}>
                  <div className="ls-lic-top">
                    <span className="ls-lic-category">{lic.category}</span>
                    {isSelected && <span className="ls-lic-selected-dot" />}
                  </div>
                  <h4 className="ls-lic-name">{lic.name}</h4>
                  <p className="ls-lic-desc">{lic.description}</p>
                  <div className="ls-lic-meta">
                    <span>Fee: {lic.fee}</span>
                    <span>{lic.processingDays} days</span>
                  </div>
                  <div className="ls-lic-actions">
                    <button className={`ls-btn ls-btn-sm ${isSelected ? 'ls-btn-outline-red' : 'ls-btn-outline'}`}
                      onClick={() => toggleLicense(lic.id)}>
                      {isSelected ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {recommended.length === 0 && <p style={{ color: '#666' }}>No specific licences matched. Please <button className="ls-link-btn" onClick={() => setView('discover')}>browse all licences</button>.</p>}
          <div className="ls-wizard-nav" style={{ marginTop: '2rem' }}>
            <button className="ls-btn ls-btn-outline" onClick={() => { setWizardResults(null); setWizardStep(0); setWizardAnswers([]); }}>Restart Wizard</button>
            {selectedIds.length > 0 && <button className="ls-btn ls-btn-primary" onClick={() => startApplication()}>Apply for {selectedIds.length} licence(s)</button>}
            <button className="ls-link-btn" onClick={() => setView('discover')}>Browse all licences</button>
          </div>
        </div>
      );
    }

    const q = WIZARD_QUESTIONS[wizardStep];
    const progress = ((wizardStep) / WIZARD_QUESTIONS.length) * 100;

    return (
      <div className="ls-wizard">
        <div className="ls-wizard-progress-bar">
          <div className="ls-wizard-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="ls-wizard-counter">Question {wizardStep + 1} of {WIZARD_QUESTIONS.length}</p>
        <h3 className="ls-wizard-question">{q.question}</h3>
        <div className="ls-wizard-options">
          {q.options.map(opt => (
            <button
              key={opt}
              className={`ls-wizard-option ${wizardAnswers[wizardStep] === opt ? 'chosen' : ''}`}
              onClick={() => {
                const updated = [...wizardAnswers];
                updated[wizardStep] = opt;
                setWizardAnswers(updated);
                if (wizardStep < WIZARD_QUESTIONS.length - 1) {
                  setWizardStep(wizardStep + 1);
                } else {
                  wizardRecommend();
                }
              }}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="ls-wizard-nav">
          {wizardStep > 0 && <button className="ls-btn ls-btn-outline" onClick={() => setWizardStep(wizardStep - 1)}>← Back</button>}
          <button className="ls-link-btn" onClick={() => setView('discover')}>Skip browse all licences</button>
        </div>
      </div>
    );
  };

  const FORM_STEPS = ['Application Form', 'Document Upload', 'Review & Submit'];

  const renderForm = () => {
    if (step === 0) {
      return (
        <div className="ls-form-view">
          <StepBar steps={FORM_STEPS} current={step} />
          <div className="ls-consent-box">
            <h4>Data Protection Notice (Botswana DPA Compliance)</h4>
            <p>By proceeding, you consent to BOCRA collecting, processing and storing your personal and business information for the purpose of evaluating this licence application. Your data will be handled in strict accordance with the Botswana Data Protection Act. Sensitive documents are encrypted at rest. You have the right to access or correct your data at any time.</p>
            <label className="ls-consent-check">
              <input type="checkbox" checked={consentGiven} onChange={e => setConsentGiven(e.target.checked)} />
              I have read and agree to the data protection terms.
            </label>
          </div>

          <div className="ls-selected-summary">
            <h4>Applying for:</h4>
            {selectedLicenses.map(l => (
              <div key={l.id} className="ls-selected-pill">{l.category} {l.name}</div>
            ))}
          </div>

          <div className="ls-fields-grid">
            {allFields.map(renderField)}
          </div>

          <div className="ls-form-actions">
            <button className="ls-btn ls-btn-ghost" onClick={handleSaveDraft}>Save Draft</button>
            <button className="ls-btn ls-btn-primary" disabled={!consentGiven} onClick={() => setStep(1)}>
              Next: Upload Documents
            </button>
          </div>
        </div>
      );
    }

    if (step === 1) {
      return (
        <div className="ls-form-view">
          <StepBar steps={FORM_STEPS} current={step} />
          <h3 className="ls-section-title">Required Documents</h3>
          <p className="ls-doc-note">Shared documents only need to be uploaded once. Files are stored securely and referenced by ID — never embedded in the form payload.</p>
          <div className="ls-docs-list">
            {allDocs.map(renderDocUpload)}
          </div>
          <div className="ls-form-actions">
            <button className="ls-btn ls-btn-outline" onClick={() => setStep(0)}>Back</button>
            <button className="ls-btn ls-btn-ghost" onClick={handleSaveDraft}>Save Draft</button>
            <button className="ls-btn ls-btn-primary" onClick={() => setStep(2)}>Next: Review</button>
          </div>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="ls-form-view">
          <StepBar steps={FORM_STEPS} current={step} />
          <h3 className="ls-section-title">Review Applications</h3>
          <p className="ls-doc-note">Please review each licence application before submitting. Shared fields have been auto-populated for all licences.</p>

          {selectedLicenses.map(lic => {
            const licFields = [...SHARED_FIELDS, ...lic.fields.map(f => ({ ...f, id: `${lic.id}_${f.id}` }))];
            const licDocs   = lic.requiredDocs.map(d => uploadedDocs.find(u => u.docId === d.id));
            return (
              <div key={lic.id} className="ls-review-block">
                <div className="ls-review-header">
                  <span className="ls-lic-category">{lic.category}</span>
                  <h4>{lic.name}</h4>
                  <span className="ls-review-fee">Fee: {lic.fee}</span>
                </div>
                <div className="ls-review-fields">
                  {licFields.map(f => {
                    const val = formData[f.id];
                    if (!val) return null;
                    return (
                      <div key={f.id} className="ls-review-field">
                        <span className="ls-review-label">{f.label}</span>
                        <span className="ls-review-value">{val}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="ls-review-docs">
                  <strong>Documents:</strong>
                  {lic.requiredDocs.map((d, i) => {
                    const up = licDocs[i];
                    return (
                      <span key={d.id} className={`ls-doc-pill ${up ? 'ok' : 'missing'}`}>
                        {up ? `✓ ${d.name}` : `${d.name} (missing)`}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="ls-submit-warning">
            <strong>Declaration:</strong> By submitting, you confirm that all information provided is accurate and complete. False declarations may result in licence revocation and legal action under Botswana law.
          </div>

          <div className="ls-form-actions">
            <button className="ls-btn ls-btn-outline" onClick={() => setStep(1)}>Back</button>
            <button className="ls-btn ls-btn-ghost" onClick={handleSaveDraft}>Save Draft</button>
            <button className="ls-btn ls-btn-primary" onClick={handleSubmit}>Submit Applications</button>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderSubmitted = () => (
    <div className="ls-submitted">
      <div className="ls-submitted-check">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83z"/></svg>
      </div>
      <h3>Applications Submitted Successfully!</h3>
      <p>Your application(s) have been received by BOCRA and assigned a tracking ID. You will receive email notifications as your applications progress through the review workflow.</p>
      <p className="ls-compliance-note">In compliance with Botswana's Electronic Communications Act and Data Protection Act, an electronic audit trail has been created for your submission. You may request a copy at any time.</p>
      <div className="ls-submitted-actions">
        <button className="ls-btn ls-btn-primary" onClick={() => setView('tracker')}>Track My Applications</button>
        <button className="ls-btn ls-btn-outline" onClick={() => { setView('home'); setSelectedIds([]); setFormData({}); setUploadedDocs([]); }}>Back to Home</button>
      </div>
    </div>
  );

  const renderTracker = () => {
    const activeApp = activeTrackerId ? applications.find(a => a.id === activeTrackerId) : null;

    const WORKFLOW_STAGES: { key: LicenseStatus; label: string }[] = [
      { key: 'draft',          label: 'Draft' },
      { key: 'under_review',   label: 'Under Review' },
      { key: 'info_requested', label: 'Info Requested' },
      { key: 'approved',       label: 'Approved' },
    ];

    const getStageIndex = (s: LicenseStatus) => {
      if (s === 'rejected') return -1;
      return WORKFLOW_STAGES.findIndex(st => st.key === s);
    };

    return (
      <div className="ls-tracker">
        <h3 className="ls-section-title">Application Tracker</h3>
        <div className="ls-tracker-layout">
          <div className="ls-tracker-list">
            {applications.length === 0 && <p style={{ color: '#999', padding: '1rem' }}>No applications yet.</p>}
            {applications.map(app => {
              const meta  = STATUS_META[app.status];
              const names = app.licenseIds.map(id => LICENSE_CATALOG.find(l => l.id === id)?.name || id).join(', ');
              return (
                <div
                  key={app.id}
                  className={`ls-tracker-item ${activeTrackerId === app.id ? 'active' : ''}`}
                  onClick={() => setActiveTrackerId(activeTrackerId === app.id ? null : app.id)}
                >
                  <div className="ls-tracker-item-info">
                    <div className="ls-app-name">{names}</div>
                    <div className="ls-app-date">{app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'Draft'}</div>
                  </div>
                  <span className="ls-status-badge" style={{ background: meta.color + '20', color: meta.color }}>
                    {meta.icon} {meta.label}
                  </span>
                </div>
              );
            })}
            <button className="ls-btn ls-btn-primary" style={{ marginTop: '1rem', width: '100%' }}
              onClick={() => { setView('discover'); setSelectedIds([]); }}>
              + New Application
            </button>
          </div>

          {activeApp && (
            <div className="ls-tracker-detail">
              <h4>{activeApp.licenseIds.map(id => LICENSE_CATALOG.find(l => l.id === id)?.name).join(', ')}</h4>
              <div className="ls-workflow-bar">
                {activeApp.status === 'rejected' ? (
                  <div className="ls-rejected-bar">Rejected — Please contact BOCRA for details.</div>
                ) : (
                  WORKFLOW_STAGES.map((stage, i) => {
                    const idx = getStageIndex(activeApp.status);
                    const isDone    = i <  idx;
                    const isCurrent = i === idx;
                    return (
                      <React.Fragment key={stage.key}>
                        <div className={`ls-wf-stage ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
                          <div className="ls-wf-dot">{isDone ? <CheckIcon /> : i + 1}</div>
                          <span>{stage.label}</span>
                        </div>
                        {i < WORKFLOW_STAGES.length - 1 && <div className={`ls-wf-line ${isDone ? 'done' : ''}`} />}
                      </React.Fragment>
                    );
                  })
                )}
              </div>

              <div className="ls-tracker-meta">
                <div><strong>Ref ID:</strong> {activeApp.id}</div>
                <div><strong>Created:</strong> {new Date(activeApp.createdAt).toLocaleString()}</div>
                {activeApp.submittedAt && <div><strong>Submitted:</strong> {new Date(activeApp.submittedAt).toLocaleString()}</div>}
                <div><strong>Version:</strong> v{activeApp.version}</div>
                <div><strong>Documents Uploaded:</strong> {activeApp.uploadedDocs.length}</div>
              </div>

              <div className="ls-tracker-action-row">
                {activeApp.status === 'draft' && (
                  <button className="ls-btn ls-btn-primary" onClick={() => resumeDraft(activeApp)}>Continue Draft</button>
                )}
                {activeApp.status === 'info_requested' && (
                  <button className="ls-btn ls-btn-primary" onClick={() => resumeDraft(activeApp)}>Provide Additional Info</button>
                )}
                {(activeApp.status === 'approved') && (
                  <button className="ls-btn ls-btn-outline">Download Licence</button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Navigation bar within the page ──────────────────────────────────────

  const NAV: { key: View; label: string }[] = [
    { key: 'home',     label: 'Home' },
    { key: 'discover', label: 'Browse' },
    { key: 'wizard',   label: 'Wizard' },
    { key: 'tracker',  label: 'My Applications' },
  ];

  return (
    <div className="ls-root">
      {/* Page Top Nav */}
      <div className="ls-top-nav">
        <h2 className="ls-page-title">
          Licensing System
        </h2>
        <div className="ls-nav-tabs">
          {NAV.map(n => (
            <button
              key={n.key}
              className={`ls-nav-tab ${view === n.key || (view === 'form' && n.key === 'discover') ? 'active' : ''}`}
              onClick={() => { setView(n.key); if (n.key !== 'form') setStep(0); }}
            >
              {n.label}
            </button>
          ))}
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="ls-breadcrumb">
        <span className="ls-link-btn" onClick={() => setView('home')}>Home</span>
        {view === 'discover' && <><span> › </span><span>Browse Licences</span></>}
        {view === 'wizard'   && <><span> › </span><span>Licence Wizard</span></>}
        {view === 'form'     && <><span> › </span><span>Browse Licences</span><span> › </span><span>Application Form</span></>}
        {view === 'tracker'  && <><span> › </span><span>Track Applications</span></>}
        {view === 'submitted'&& <><span> › </span><span>Submitted</span></>}
      </div>

      {/* Content */}
      <div className="ls-content">
        {view === 'home'      && renderHome()}
        {view === 'discover'  && renderDiscover()}
        {view === 'wizard'    && renderWizard()}
        {view === 'form'      && renderForm()}
        {view === 'submitted' && renderSubmitted()}
        {view === 'tracker'   && renderTracker()}
      </div>
    </div>
  );
};

export default LicensingSystem;
