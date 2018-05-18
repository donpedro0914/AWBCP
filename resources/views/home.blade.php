@extends('layouts.app')

@section('content')
<main id="main-container" style="min-height: 402px;">
	<div class="content">
		<div class="row js-masonry">
			@foreach ($productList as $product)
				<div class="col-sm-6 col-lg-4 js-masonry-item">
					<a class="block" href="/product/x/{{ $product->product_name }}">
						<div class="block-content block-content-full">
							{{ HTML::image('product/'. $product->product_name .'/'.$product->product_image, $product->product_name, array('class' => 'img-responsive')) }}
							<div class="block-content block-content-full">
								<h2 class="h2 push-10">{{ $product->product_name }}</h2>
							</div>
						</div>
					</a>
				</div>
			@endforeach
		</div>
	</div>
</main>
@endsection