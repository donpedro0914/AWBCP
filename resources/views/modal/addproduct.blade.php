<template>
	<div id="addproduct" class="modal fade" role="dialog">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<form action="{{  URL::to('product/store') }}" method="post" id="addProductForm">
					{{ csrf_field() }}
					<div class="block block-themed block-transparent">
						<div class="block-header bg-success">
							<ul class="block-options">
								<li>
									<button data-dismiss="modal" type="button"><i class="si si-close"></i></button>
								</li>
							</ul>
							<h3 class="block-title">Add Product</h3>
						</div>
						<div class="modal-body">
							<div class="block">
								<div class="row">
									<div class="col-xs-12 col-md-12 form-group">
										<label>Product Name</label>
										<input type="text" class="form-control" name="position_name" />
									</div>
								</div>
								<div class="row">
						          <div class="col-md-12 col-xs-12">
						            <h5><strong>Position Options</strong></h5>
						            <hr/>
						          </div>
					        	</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="submit" id="AddProductBtn" class="btn btn-success">Add Product</button>
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>