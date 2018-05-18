@extends('layouts.app')

@section('content')
<main id="main-container" style="min-height: 402px;">
	@include('admin.header')
	<div class="content content-boxed">
		<div clas="row">
			<div class="col-lg-12">
				<div class="block">
					<div class="block-content block-content-full" style="overflow: auto;">
						<div class="col-md-12">
							<h3 class="block-title">Add Product</h3>
							<form method="post" class="form-horizontal" action="{{  URL::to('product/store') }}" enctype="multipart/form-data">
								{{csrf_field()}}
								<div class="col-md-12">
									<div class="form-group">
										<div class="col-sm-8 col-sm-offset-2">
											<label>Product Name</label>
											<input class="form-control" type="text" name="product_name">
										</div>
									</div>
									<div class="form-group">
										<div class="col-sm-8 col-sm-offset-2">
											<label>Product Image</label>
											<input class="form-control" type="file" name="product_image">
										</div>
									</div>
									<div class="form-group">
							        	<div class="pull-right">
							        		<input type="submit" class="btn btn-infinity" value="Submit" />
							        	</div>
							        </div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
@endsection