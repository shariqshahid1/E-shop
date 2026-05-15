import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const id = (await params).id;
    const product = await Product.findById(id);

    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const id = (await params).id;
    const body = await request.json();
    const product = await Product.findById(id);

    if (product) {
      product.name = body.name || product.name;
      product.price = body.price || product.price;
      product.description = body.description || product.description;
      product.image = body.image || product.image;
      product.category = body.category || product.category;
      product.countInStock = body.countInStock || product.countInStock;

      const updatedProduct = await product.save();
      return NextResponse.json(updatedProduct);
    } else {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const id = (await params).id;
    const product = await Product.findById(id);

    if (product) {
      await product.deleteOne();
      return NextResponse.json({ message: 'Product removed' });
    } else {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
