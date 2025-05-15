export type PodsResponse = {
  apiVersion: string;
  items: PodsItemsResponse[];
  kind: string;
  metadata: { resourceVersion: string };
};
export type PodsItemsResponse = {
  metadata: Metadata;
  spec: PodSpec;
  status: PodStatus;
};

// ==============================
// Metadata
// ==============================

export type Metadata = {
  name: string;
  namespace: string;
  uid: string;
  resourceVersion: string;
  creationTimestamp: string;
  annotations?: Record<string, string>;
  managedFields: ManagedField[];
};

export type ManagedField = {
  manager: string;
  operation: string;
  apiVersion: string;
  time: string;
  fieldsType: string;
  fieldsV1: any;
  subresource?: string;
};

// ==============================
// Pod Spec
// ==============================

export type PodSpec = {
  volumes: Volume[];
  containers: Container[];
  restartPolicy: string;
  terminationGracePeriodSeconds: number;
  dnsPolicy: string;
  serviceAccountName: string;
  serviceAccount: string;
  nodeName: string;
  securityContext: Record<string, unknown>;
  schedulerName: string;
  tolerations: Toleration[];
  priority: number;
  enableServiceLinks: boolean;
  preemptionPolicy: string;
};

export type Volume = {
  name: string;
  projected: {
    sources: ProjectedSource[];
    defaultMode: number;
  };
};

export type ProjectedSource = {
  serviceAccountToken?: {
    expirationSeconds: number;
    path: string;
  };
  configMap?: {
    name: string;
    items: {
      key: string;
      path: string;
    }[];
  };
  downwardAPI?: {
    items: {
      path: string;
      fieldRef: {
        apiVersion: string;
        fieldPath: string;
      };
    }[];
  };
};

export type Container = {
  name: string;
  image: string;
  resources: Record<string, unknown>;
  volumeMounts: VolumeMount[];
  terminationMessagePath: string;
  terminationMessagePolicy: string;
  imagePullPolicy: string;
};

export type VolumeMount = {
  name: string;
  readOnly: boolean;
  mountPath: string;
};

export type Toleration = {
  key: string;
  operator: string;
  effect: string;
  tolerationSeconds: number;
};

// ==============================
// Pod Status
// ==============================

export type PodStatus = {
  phase: string;
  conditions: PodCondition[];
  hostIP: string;
  hostIPs: IPAddress[];
  podIP: string;
  podIPs: IPAddress[];
  startTime: string;
  containerStatuses: ContainerStatus[];
  qosClass: string;
};

export type PodCondition = {
  type: string;
  status: string;
  lastProbeTime: string | null;
  lastTransitionTime: string;
};

export type IPAddress = {
  ip: string;
};

export type ContainerStatus = {
  name: string;
  state: ContainerState;
  lastState: ContainerLastState;
  ready: boolean;
  restartCount: number;
  image: string;
  imageID: string;
  containerID: string;
  started: boolean;
  volumeMounts: DetailedVolumeMount[];
};

export type ContainerState = {
  running?: {
    startedAt: string;
  };
};

export type ContainerLastState = {
  terminated?: {
    exitCode: number;
    reason: string;
    startedAt: string;
    finishedAt: string;
    containerID: string;
  };
};

export type DetailedVolumeMount = {
  name: string;
  mountPath: string;
  readOnly: boolean;
  recursiveReadOnly: string;
};
