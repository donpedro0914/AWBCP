@extends('layouts.app')

@section('content')
<main id="main-container" style="min-height: 402px;">
	@include('admin.header')
	<div class="content content-boxed">
		<div clas="row">
			<div class="col-lg-12">
				<div class="block">
					<div class="block-content block-content-full" style="overflow: auto;">
						<div class="col-sm-6">
							<div class="col-sm-4">
								<div class="block">
									<button class="btn btn-block btn-infinity" data-toggle="modal" data-target="#addproduct"><i class="fa fa-plus"></i><span> Add Product</span></button>
									@include('modal.addproduct')
								</div>
							</div>
						</div>
						<div class="col-md-12">
							<table class="table table-bordered dataTable no-footer table-striped ajax-table-product">
								<thead>
									<tr>
										<th class="text-center">Product Name</th>
										<th class="text-center">Action</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
@endsection