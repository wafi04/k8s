// app/api/k8s/pods/route.ts
import { KUBE_TOKEN } from "@/constants";
import { deployment } from "@/data/depoy-data";
import { Api } from "@/lib/axios";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// GET handler for fetching pods
export async function GET() {
  const namespace = "default";
  const api = new Api(KUBE_TOKEN);

  try {
    const response = await api.get(`/namespaces/${namespace}/pods`, {
      headers: {
        Authorization: `Bearer ${process.env.KUBE_TOKEN}`,
        Accept: "application/json",
      },
    });

    return NextResponse.json(
      {
        message: "Data Recieved successfully",
        data: response.data,
        status: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed To Send Data",
        status: false,
        code: 400,
      },
      { status: 400 }
    );
  }
}

// POST handler for creating deployments
export async function POST(request: NextRequest) {
  const api = new Api(KUBE_TOKEN);

  try {
    // In App Router, we need to await request.json()
    const body = await request.json();
    const { name, runtime, version, image } = body;

    if (!name || !runtime || !version || !image) {
      return NextResponse.json(
        {
          status: false,
          code: 400,
          message:
            "Missing required fields: name, runtime, version, and image are required",
        },
        { status: 400 }
      );
    }

    const deploymentData = deployment({
      ...body,
    });

    const createUrl = `http://192.168.100.170/api/v1/namespaces/nodejs/deployments`;
    const response = await api.post(createUrl, deploymentData, {
      headers: {
        Authorization: `Bearer ${process.env.KUBE_TOKEN}`,
        Accept: "application/json",
      },
    });

    console.log(response);
    return NextResponse.json(
      {
        message: "Deployment created successfully",
        data: response.data,
        code: 201,
        status: true,
      },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        message: errorMessage,
        code: 500,
        status: false,
      },
      { status: 500 }
    );
  }
}

// DELETE handler for removing deployments
export async function DELETE(request: NextRequest) {
  const namespace = "default";
  const api = new Api(KUBE_TOKEN);

  try {
    // For DELETE requests with body in App Router
    const body = await request.json();
    const { podName, namespace: podNamespace = namespace } = body;

    if (!podName) {
      return NextResponse.json(
        {
          code: 400,
          status: false,
          message: "Pod name is required",
        },
        { status: 400 }
      );
    }

    const deploymentName = podName;
    const deleteUrl = `/namespaces/${podNamespace}/deployments/${deploymentName}`;

    await api.delete(deleteUrl, {
      headers: {
        Authorization: `Bearer ${process.env.KUBE_TOKEN}`,
        Accept: "application/json",
      },
    });

    return NextResponse.json(
      {
        message: "Pod deleted successfully",
        code: 200,
        status: true,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        message: errorMessage,
        code: 500,
        status: false,
      },
      { status: 500 }
    );
  }
}
